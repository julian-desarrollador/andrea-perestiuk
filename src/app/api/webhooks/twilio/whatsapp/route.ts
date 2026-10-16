import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

const respuestaConfirmado = "Perfecto, queda confirmado. Te esperamos.";

export async function POST(request: Request) {
  const params = Object.fromEntries(new URLSearchParams(await request.text()));
  if (!firmaValida(request, params)) {
    return NextResponse.json({ error: "Firma inválida" }, { status: 403 });
  }
  if (!esConfirmacion(params)) return twiml();
  return twiml(respuestaConfirmado);
}

function esConfirmacion(params: Record<string, string>) {
  const texto = [params.ButtonPayload, params.ButtonText, params.Body]
    .filter(Boolean)
    .join(" ")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "");
  return /\bconfirm/.test(texto) || texto.includes("confirmar") || texto.includes("confirmo");
}

function firmaValida(request: Request, params: Record<string, string>) {
  const token = process.env.TWILIO_AUTH_TOKEN?.trim() ?? "";
  const firma = request.headers.get("x-twilio-signature") ?? "";
  if (!token || !firma) return false;
  const esperada = Buffer.from(firma);
  return urlsFirmadas(request).some((url) => {
    const digesto = createHmac("sha1", token).update(url + cadena(params)).digest("base64");
    const recibida = Buffer.from(digesto);
    return esperada.length === recibida.length && timingSafeEqual(esperada, recibida);
  });
}

function urlsFirmadas(request: Request) {
  const urls = new Set<string>();
  const configurada = process.env.TWILIO_WEBHOOK_PUBLIC_URL?.trim().replace(/\/$/, "");
  if (configurada) urls.add(configurada);
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? "";
  const proto = request.headers.get("x-forwarded-proto") ?? "https";
  if (host) urls.add(`${proto}://${host}/api/webhooks/twilio/whatsapp`);
  urls.add("https://andrea-perestiuk.vercel.app/api/webhooks/twilio/whatsapp");
  return [...urls];
}

function cadena(params: Record<string, string>) {
  return Object.keys(params)
    .sort()
    .map((key) => key + params[key])
    .join("");
}

function twiml(texto = "") {
  const mensaje = texto ? `<Message>${xml(texto)}</Message>` : "";
  return new NextResponse(`<?xml version="1.0" encoding="UTF-8"?><Response>${mensaje}</Response>`, {
    status: 200,
    headers: { "Content-Type": "text/xml" },
  });
}

function xml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}
