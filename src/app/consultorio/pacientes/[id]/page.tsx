import { notFound } from "next/navigation";
import { FichaEditor } from "@/components/consultorio/ficha-editor";
import { ConsultorioShell } from "@/components/consultorio/shell";
import { requireSession } from "@/lib/consultorio/guard";
import { readStore } from "@/lib/consultorio/store";

export default async function FichaPage(props: PageProps<"/consultorio/pacientes/[id]">) {
  await requireSession();
  const { id } = await props.params;
  const store = await readStore();
  const patient = store.patients.find((item) => item.id === id);
  if (!patient) notFound();

  return (
    <ConsultorioShell current="/consultorio/pacientes">
      <FichaEditor initial={patient} />
    </ConsultorioShell>
  );
}
