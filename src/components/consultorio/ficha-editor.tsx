"use client";

import { useEffect, useRef, useState } from "react";
import { deletePatient, guardarFirma, savePatientFields } from "@/app/consultorio/actions";
import { consentSheets } from "@/lib/consultorio/consents";
import { fechaDeInicio, fechaEnPalabras, todayInArgentina } from "@/lib/consultorio/fecha";
import { allTeeth, toothMarks, type Patient, type ToothMark } from "@/lib/consultorio/types";

const tabs = [
  { id: "datos", label: "Datos" },
  { id: "visitas", label: "Visitas" },
  { id: "dientes", label: "Dientes" },
  { id: "firmas", label: "Firmas" },
] as const;

type Tab = (typeof tabs)[number]["id"];

const quadrants = [
  { title: "Arriba, derecha del paciente", teeth: ["18", "17", "16", "15", "14", "13", "12", "11"] },
  { title: "Arriba, izquierda del paciente", teeth: ["21", "22", "23", "24", "25", "26", "27", "28"] },
  { title: "Abajo, derecha del paciente", teeth: ["48", "47", "46", "45", "44", "43", "42", "41"] },
  { title: "Abajo, izquierda del paciente", teeth: ["31", "32", "33", "34", "35", "36", "37", "38"] },
];

const markById = Object.fromEntries(toothMarks.map((mark) => [mark.id, mark])) as Record<
  ToothMark,
  (typeof toothMarks)[number]
>;

function ready(patient: Patient): Patient {
  return {
    ...patient,
    document: patient.document ?? "",
    birthDate: patient.birthDate ?? "",
    contact: patient.contact ?? "",
    address: patient.address ?? "",
    familyContact: patient.familyContact ?? "",
    background: patient.background ?? "",
    reason: patient.reason ?? "",
    startedOn: fechaDeInicio(patient),
    evolution: patient.evolution ?? [],
    teeth: patient.teeth ?? {},
    consents: patient.consents ?? [],
  };
}

function draftOf(patient: Patient) {
  return JSON.stringify({
    name: patient.name,
    document: patient.document ?? "",
    birthDate: patient.birthDate ?? "",
    contact: patient.contact,
    address: patient.address ?? "",
    familyContact: patient.familyContact ?? "",
    background: patient.background,
    reason: patient.reason,
    startedOn: fechaDeInicio(patient),
    evolution: patient.evolution,
    teeth: patient.teeth,
  });
}

export function FichaEditor({ initial }: { initial: Patient }) {
  const [patient, setPatient] = useState(() => ready(initial));
  const [tab, setTab] = useState<Tab>("visitas");
  const [selected, setSelected] = useState<string | null>(null);
  const [notice, setNotice] = useState("");
  const [confirmName, setConfirmName] = useState("");
  const [askDelete, setAskDelete] = useState(false);
  const saved = useRef(draftOf(ready(initial)));
  const latest = useRef(draftOf(ready(initial)));

  const draft = draftOf(patient);
  latest.current = draft;

  useEffect(() => {
    if (draft === saved.current) return;
    if (!patient.name.trim()) {
      setNotice("Escribí el nombre antes de guardar.");
      return;
    }
    setNotice("Guardando…");
    const sent = draft;
    const timer = setTimeout(async () => {
      const result = await savePatientFields(patient);
      if (latest.current !== sent) return;
      if ("error" in result) {
        setNotice("No se pudo guardar. Revisá la conexión.");
        return;
      }
      saved.current = sent;
      setNotice("Guardado");
    }, 700);
    return () => clearTimeout(timer);
  }, [draft, patient]);

  function setMark(mark: ToothMark) {
    if (!selected) return;
    setPatient((current) => {
      const teeth = { ...current.teeth };
      if (mark === "sana") delete teeth[selected];
      else teeth[selected] = mark;
      return { ...current, teeth };
    });
  }

  async function onPhoto(kind: Patient["consents"][number]["kind"], file: File) {
    setNotice("Guardando…");
    const data = new FormData();
    data.set("patientId", patient.id);
    data.set("kind", kind);
    data.set("scan", file);
    const result = await guardarFirma(data);
    if ("error" in result) {
      setNotice(result.error);
      return;
    }
    setPatient(result.patient);
    saved.current = draftOf(result.patient);
    setNotice("Guardado");
  }

  const selectedMark = selected ? (patient.teeth[selected] ?? "sana") : null;

  return (
    <div>
      <h1 className="font-serif text-4xl text-forest md:text-5xl">{patient.name || "Sin nombre"}</h1>
      <p className="mt-2 hidden text-muted print:block">Od. Andrea Perestiuk · Odontología</p>
      <div className="mt-6 grid grid-cols-4 gap-2 print:hidden" role="tablist">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={tab === item.id}
            onClick={() => setTab(item.id)}
            className={`min-h-12 rounded-xl px-1 text-forest ${tab === item.id ? "bg-sand" : "bg-white"}`}
          >
            {item.label}
          </button>
        ))}
      </div>
      {notice ? (
        <p className="fixed inset-x-0 bottom-20 z-30 bg-sand py-3 text-center text-forest print:hidden md:bottom-0" role="status">
          {notice}
        </p>
      ) : null}

      <section className={tab === "datos" ? "mt-8" : "mt-8 hidden print:block"}>
        <h2 className="font-serif text-3xl">Datos</h2>
        <div className="mt-6 grid gap-4">
          <label className="block">
            Nombre
            <input
              value={patient.name}
              onChange={(event) => setPatient({ ...patient, name: event.target.value })}
              className="mt-2 min-h-12 w-full rounded-xl border border-sand bg-white px-4 text-lg"
            />
          </label>
          <label className="block">
            Documento
            <input
              value={patient.document ?? ""}
              onChange={(event) => setPatient({ ...patient, document: event.target.value })}
              className="mt-2 min-h-12 w-full rounded-xl border border-sand bg-white px-4 text-lg"
            />
          </label>
          <label className="block">
            Fecha de nacimiento
            <input
              type="date"
              value={patient.birthDate ?? ""}
              onChange={(event) => setPatient({ ...patient, birthDate: event.target.value })}
              className="mt-2 min-h-12 w-full rounded-xl border border-sand bg-white px-4 text-lg"
            />
          </label>
          <label className="block">
            Teléfono
            <input
              value={patient.contact}
              onChange={(event) => setPatient({ ...patient, contact: event.target.value })}
              inputMode="tel"
              className="mt-2 min-h-12 w-full rounded-xl border border-sand bg-white px-4 text-lg"
            />
          </label>
          <label className="block">
            Domicilio
            <input
              value={patient.address ?? ""}
              onChange={(event) => setPatient({ ...patient, address: event.target.value })}
              className="mt-2 min-h-12 w-full rounded-xl border border-sand bg-white px-4 text-lg"
            />
          </label>
          <label className="block">
            Contacto familiar
            <input
              value={patient.familyContact ?? ""}
              onChange={(event) => setPatient({ ...patient, familyContact: event.target.value })}
              placeholder="Nombre y teléfono"
              className="mt-2 min-h-12 w-full rounded-xl border border-sand bg-white px-4 text-lg"
            />
          </label>
          <p className="text-forest">Ficha empezada el {fechaEnPalabras(fechaDeInicio(patient))}</p>
          <label className="block">
            Antecedentes
            <textarea
              value={patient.background}
              onChange={(event) => setPatient({ ...patient, background: event.target.value })}
              rows={4}
              className="mt-2 w-full rounded-xl border border-sand bg-white px-4 py-3 text-lg"
            />
          </label>
          <label className="block">
            Motivo de consulta
            <textarea
              value={patient.reason}
              onChange={(event) => setPatient({ ...patient, reason: event.target.value })}
              rows={3}
              className="mt-2 w-full rounded-xl border border-sand bg-white px-4 py-3 text-lg"
            />
          </label>
        </div>
      </section>

      <section className={tab === "visitas" ? "mt-8" : "mt-8 hidden print:block"}>
        <h2 className="font-serif text-3xl">Visitas</h2>
        <button
          type="button"
          className="mt-6 inline-flex h-12 items-center rounded-full bg-forest px-5 text-lg text-cream print:hidden"
          onClick={() =>
            setPatient({
              ...patient,
              evolution: [{ id: crypto.randomUUID(), date: todayInArgentina(), text: "" }, ...patient.evolution],
            })
          }
        >
          Agregar visita de hoy
        </button>
        <div className="mt-6 space-y-4">
          {patient.evolution.length === 0 ? <p className="text-forest">Todavía no hay visitas.</p> : null}
          {[...patient.evolution]
            .sort((a, b) => b.date.localeCompare(a.date))
            .map((note) =>
              note.date === todayInArgentina() ? (
                <div key={note.id} className="rounded-2xl border border-sand bg-white p-4">
                  <p className="text-forest">{fechaEnPalabras(note.date)}</p>
                  <textarea
                    value={note.text}
                    onChange={(event) =>
                      setPatient({
                        ...patient,
                        evolution: patient.evolution.map((item) =>
                          item.id === note.id ? { ...item, text: event.target.value } : item,
                        ),
                      })
                    }
                    rows={3}
                    placeholder="Qué se hizo"
                    className="mt-3 w-full rounded-xl border border-sand px-3 py-3 text-lg"
                  />
                  <button
                    type="button"
                    className="mt-2 inline-flex h-12 items-center text-forest print:hidden"
                    onClick={() =>
                      setPatient({
                        ...patient,
                        evolution: patient.evolution.filter((item) => item.id !== note.id),
                      })
                    }
                  >
                    Quitar visita
                  </button>
                </div>
              ) : (
                <div key={note.id} className="rounded-2xl border border-sand bg-white p-4">
                  <p className="text-forest">{fechaEnPalabras(note.date)}</p>
                  <p className="mt-3 whitespace-pre-wrap text-lg text-forest">{note.text || "Sin anotación."}</p>
                </div>
              ),
            )}
        </div>
      </section>

      <section className={tab === "dientes" ? "mt-8" : "mt-8 hidden print:block"}>
        <h2 className="font-serif text-3xl">Dientes</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {quadrants.map((quadrant) => (
            <div key={quadrant.title}>
              <h3 className="font-serif text-2xl">{quadrant.title}</h3>
              <div className="mt-3 grid grid-cols-4 gap-2">
                {quadrant.teeth.map((tooth) => {
                  const mark = patient.teeth[tooth] ?? "sana";
                  return (
                    <button
                      key={tooth}
                      type="button"
                      onClick={() => setSelected(tooth)}
                      aria-pressed={selected === tooth}
                      aria-label={`Pieza ${tooth}, ${markById[mark].label}`}
                      className={`flex min-h-12 flex-col overflow-hidden rounded-lg border bg-cream text-lg text-forest ${selected === tooth ? "border-forest ring-2 ring-forest" : "border-sand"}`}
                    >
                      <span className="h-3 w-full" style={{ background: markById[mark].color }} />
                      <span className={`pt-2 ${mark === "ausente" ? "line-through" : ""}`}>{tooth}</span>
                      <span className="min-h-6 break-words px-1 pb-2 text-base leading-tight">{markById[mark].short}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 print:hidden">
          <p className="text-forest">{selected ? `Pieza ${selected}` : "Tocá una pieza."}</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {toothMarks.map((mark) => (
              <button
                key={mark.id}
                type="button"
                disabled={!selected}
                onClick={() => setMark(mark.id)}
                className={`flex min-h-12 items-center gap-3 rounded-xl border bg-white px-4 text-left text-lg text-forest disabled:opacity-50 ${selectedMark === mark.id ? "border-forest" : "border-sand"}`}
              >
                <span className="h-6 w-6 shrink-0 rounded-full border border-sand" style={{ background: mark.color }} />
                {mark.label}
              </button>
            ))}
          </div>
        </div>
        <ul className="mt-4 hidden gap-2 print:grid">
          {allTeeth.map((tooth) => {
            const mark = patient.teeth[tooth];
            return mark ? (
              <li key={tooth}>
                Pieza {tooth}: {markById[mark].label}
              </li>
            ) : null;
          })}
        </ul>
      </section>

      <section className={tab === "firmas" ? "mt-8" : "mt-8 hidden print:block"}>
        <h2 className="font-serif text-3xl">Firmas</h2>
        <p className="mt-3 text-forest print:hidden">Imprimí la hoja, la firman en papel y subí la foto.</p>
        <ul className="mt-6 space-y-4">
          {consentSheets.map((sheet) => {
            const signed = patient.consents.find((item) => item.kind === sheet.kind);
            return (
              <li key={sheet.kind} className="rounded-2xl border border-sand bg-white p-4">
                <h3 className="font-serif text-2xl">{sheet.practice}</h3>
                {signed ? (
                  <p className="mt-2 text-forest">
                    Firmó el {signed.signedOn.split("-").reverse().join("/")}
                    {signed.fileId ? (
                      <>
                        {" · "}
                        <a className="text-forest underline" href={`/consultorio/archivo/${signed.fileId}`}>
                          Ver foto
                        </a>
                      </>
                    ) : null}
                  </p>
                ) : (
                  <p className="mt-2 text-muted">Todavía no hay foto.</p>
                )}
                <div className="mt-4 grid gap-3 print:hidden">
                  <a
                    href={`/consultorio/consentimientos/${sheet.kind}?nombre=${encodeURIComponent(patient.name)}`}
                    className="inline-flex h-12 items-center justify-center rounded-full border border-forest px-5 text-lg text-forest"
                  >
                    Imprimir hoja
                  </a>
                  <label className="inline-flex h-12 cursor-pointer items-center justify-center rounded-full bg-forest px-5 text-lg text-cream">
                    {signed ? "Subir otra foto" : "Ya firmó: subir foto"}
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        event.target.value = "";
                        if (file) void onPhoto(sheet.kind, file);
                      }}
                    />
                  </label>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <div className="mt-12 print:hidden">
        {askDelete ? (
          <div className="rounded-2xl border border-sand p-4">
            <p>Para eliminar la ficha, escribí el nombre: {patient.name}</p>
            <input
              value={confirmName}
              onChange={(event) => setConfirmName(event.target.value)}
              className="mt-3 min-h-12 w-full rounded-xl border border-sand bg-white px-4 text-lg"
            />
            <button
              type="button"
              disabled={confirmName.trim() !== patient.name.trim() || !patient.name.trim()}
              onClick={() => deletePatient(patient.id)}
              className="mt-3 inline-flex h-12 items-center text-[#6b2e2a] disabled:opacity-40"
            >
              Eliminar ficha
            </button>
          </div>
        ) : (
          <button type="button" className="text-muted" onClick={() => setAskDelete(true)}>
            Eliminar ficha
          </button>
        )}
      </div>
    </div>
  );
}
