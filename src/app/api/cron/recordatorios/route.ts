import { NextResponse } from "next/server";
import { enviarRecordatorios } from "@/lib/consultorio/agenda";

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET ?? "";
  const header = request.headers.get("authorization") ?? "";
  if (!secret || header !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  try {
    const result = await enviarRecordatorios();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "No se pudieron enviar los recordatorios." },
      { status: 500 },
    );
  }
}
