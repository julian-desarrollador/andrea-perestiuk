import { hasSession } from "@/lib/consultorio/guard";
import { readStore, readUpload } from "@/lib/consultorio/store";

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await hasSession())) {
    return new Response("No autorizado", { status: 401 });
  }
  const { id } = await context.params;
  const store = await readStore();
  const consent = store.patients
    .flatMap((patient) => patient.consents)
    .find((item) => item.fileId === id);
  if (!consent) return new Response("No encontrado", { status: 404 });

  const bytes = await readUpload(id);
  if (!bytes) return new Response("No encontrado", { status: 404 });

  return new Response(new Uint8Array(bytes), {
    headers: {
      "Content-Type": consent.mime || "application/octet-stream",
      "Content-Disposition": "inline",
      "Cache-Control": "private, no-store",
    },
  });
}
