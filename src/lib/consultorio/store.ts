import { promises as fs } from "fs";
import path from "path";
import { fechaDeInicio, isIsoDate, todayInArgentina } from "./fecha";
import { seedFees } from "./fees";
import {
  allTeeth,
  toothMarks,
  type ConsentKind,
  type Evolution,
  type FeeItem,
  type Patient,
  type SignedConsent,
  type Store,
  type ToothMark,
} from "./types";

const dataDir = path.join(process.cwd(), "data");
const storePath = path.join(dataDir, "consultorio.json");
const uploadsDir = path.join(dataDir, "adjuntos");

let writeChain: Promise<unknown> = Promise.resolve();

function turn<T>(task: () => Promise<T>) {
  const run = writeChain.then(task, task);
  writeChain = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

const marks = new Set<string>(toothMarks.map((mark) => mark.id));
const teeth = new Set<string>(allTeeth);
const kinds = new Set<ConsentKind>(["implante", "cirugia", "endodoncia"]);

function clip(value: unknown, max: number) {
  return String(value ?? "").trim().slice(0, max);
}

function money(value: unknown) {
  if (value == null || value === "") return null;
  const number = typeof value === "number" ? value : Number(String(value).replace(/\./g, "").replace(",", "."));
  if (!Number.isFinite(number) || number < 0 || number > 100_000_000) return null;
  return Math.round(number);
}

export function emptyPatient(name: string): Patient {
  return {
    id: crypto.randomUUID(),
    name: clip(name, 120),
    document: "",
    birthDate: "",
    contact: "",
    address: "",
    familyContact: "",
    background: "",
    reason: "",
    startedOn: todayInArgentina(),
    evolution: [],
    teeth: {},
    consents: [],
    updatedAt: new Date().toISOString(),
  };
}

export function mergeVisits(stored: Evolution[], incoming: Evolution[], today: string) {
  const past = stored.filter((note) => note.date < today).map((note) => ({ ...note }));
  const pastIds = new Set(past.map((note) => note.id));
  const fromToday = incoming.filter((note) => note.date >= today && !pastIds.has(note.id));
  const room = Math.max(0, 200 - past.length);
  return [...fromToday.slice(0, room), ...past].sort((a, b) => b.date.localeCompare(a.date));
}

export function sanitizePatient(input: unknown): Patient | null {
  if (!input || typeof input !== "object") return null;
  const raw = input as Partial<Patient>;
  const name = clip(raw.name, 120);
  if (!name || !raw.id) return null;

  const evolution = Array.isArray(raw.evolution)
    ? raw.evolution.slice(0, 200).flatMap((note) => {
        if (!note || typeof note !== "object") return [];
        const text = clip(note.text, 4000);
        const date = clip(note.date, 10);
        if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return [];
        return [{ id: clip(note.id, 80) || crypto.randomUUID(), date, text }];
      })
    : [];

  const toothMap: Patient["teeth"] = {};
  if (raw.teeth && typeof raw.teeth === "object") {
    for (const [tooth, mark] of Object.entries(raw.teeth)) {
      if (teeth.has(tooth) && marks.has(String(mark)) && mark !== "sana") {
        toothMap[tooth] = mark as ToothMark;
      }
    }
  }

  const consents: SignedConsent[] = Array.isArray(raw.consents)
    ? raw.consents.slice(0, 50).flatMap((item) => {
        if (!item || typeof item !== "object") return [];
        if (!kinds.has(item.kind)) return [];
        const signedOn = clip(item.signedOn, 10);
        if (!/^\d{4}-\d{2}-\d{2}$/.test(signedOn)) return [];
        const consent: SignedConsent = {
          id: clip(item.id, 80) || crypto.randomUUID(),
          kind: item.kind,
          signedOn,
        };
        if (item.fileId) consent.fileId = clip(item.fileId, 80);
        if (item.fileName) consent.fileName = clip(item.fileName, 180);
        if (item.mime) consent.mime = clip(item.mime, 80);
        return [consent];
      })
    : [];

  return {
    id: clip(raw.id, 80),
    name,
    document: clip(raw.document, 32),
    birthDate: isIsoDate(clip(raw.birthDate, 10)) ? clip(raw.birthDate, 10) : "",
    contact: clip(raw.contact, 200),
    address: clip(raw.address, 200),
    familyContact: clip(raw.familyContact, 200),
    background: clip(raw.background, 8000),
    reason: clip(raw.reason, 4000),
    startedOn: fechaDeInicio({ ...raw, evolution }),
    evolution,
    teeth: toothMap,
    consents,
    updatedAt: new Date().toISOString(),
  };
}

export function sanitizeFees(input: unknown): FeeItem[] {
  if (!Array.isArray(input)) return [];
  return input.slice(0, 400).flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const name = clip(item.name, 180);
    if (!name) return [];
    return [
      {
        id: clip(item.id, 80) || crypto.randomUUID(),
        code: clip(item.code, 20),
        chapter: clip(item.chapter, 80) || "Consultorio",
        name,
        minimum: money(item.minimum),
        price: money(item.price),
        offered: item.offered !== false,
      },
    ];
  });
}

export async function readStore(): Promise<Store> {
  try {
    const raw = await fs.readFile(storePath, "utf8");
    const parsed = JSON.parse(raw) as Store;
    if (!Array.isArray(parsed.patients) || !Array.isArray(parsed.fees)) {
      throw new Error("Archivo inválido");
    }
    return parsed;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return { patients: [], fees: seedFees() };
    }
    throw error;
  }
}

export async function writeStore(store: Store) {
  await fs.mkdir(dataDir, { recursive: true });
  const temporary = `${storePath}.tmp`;
  await fs.writeFile(temporary, JSON.stringify(store), "utf8");
  await fs.rename(temporary, storePath);
}

export async function saveUpload(file: File) {
  if (file.size <= 0 || file.size > 5 * 1024 * 1024) {
    throw new Error("El archivo tiene que pesar menos de 5 MB.");
  }
  const allowed = new Set(["image/jpeg", "image/png", "image/webp", "application/pdf"]);
  let mime = file.type;
  if (!mime) {
    const name = file.name.toLowerCase();
    if (name.endsWith(".png")) mime = "image/png";
    else if (name.endsWith(".webp")) mime = "image/webp";
    else if (name.endsWith(".pdf")) mime = "application/pdf";
    else mime = "image/jpeg";
  }
  if (!allowed.has(mime)) {
    throw new Error("La foto tiene que ser JPG, PNG o PDF.");
  }
  const id = crypto.randomUUID();
  await fs.mkdir(uploadsDir, { recursive: true });
  const bytes = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(uploadsDir, id), bytes);
  return { fileId: id, fileName: clip(file.name, 180), mime };
}

export function uploadPath(fileId: string) {
  if (!/^[0-9a-f-]{36}$/i.test(fileId)) return null;
  return path.join(uploadsDir, fileId);
}

export async function removeUploads(fileIds: string[]) {
  await Promise.all(
    fileIds.map(async (fileId) => {
      const target = uploadPath(fileId);
      if (!target) return;
      await fs.rm(target, { force: true });
    }),
  );
}

export function addPatientRecord(name: string) {
  return turn(async () => {
    const store = await readStore();
    const patient = emptyPatient(name);
    store.patients.unshift(patient);
    await writeStore(store);
    return patient;
  });
}

export function savePatientRecord(input: unknown) {
  return turn(async () => {
    const store = await readStore();
    const incoming = sanitizePatient(input);
    if (!incoming) throw new Error("Completá el nombre.");
    const index = store.patients.findIndex((item) => item.id === incoming.id);
    if (index < 0) throw new Error("No encontré esta ficha.");
    const current = store.patients[index];
    store.patients[index] = {
      ...incoming,
      startedOn: isIsoDate(current.startedOn) ? current.startedOn : incoming.startedOn,
      evolution: mergeVisits(current.evolution ?? [], incoming.evolution, todayInArgentina()),
      consents: current.consents,
    };
    await writeStore(store);
    return store.patients[index];
  });
}

export function saveFeeRecord(input: unknown) {
  return turn(async () => {
    const store = await readStore();
    const fee = sanitizeFees([input])[0];
    if (!fee) throw new Error("Revisá el nombre de la práctica.");
    const index = store.fees.findIndex((item) => item.id === fee.id);
    if (index < 0) store.fees.push(fee);
    else store.fees[index] = fee;
    await writeStore(store);
    return fee;
  });
}

export function saveSignature(patientId: string, kind: ConsentKind, file: File) {
  return turn(async () => {
    const uploaded = await saveUpload(file);
    const store = await readStore();
    const patient = store.patients.find((item) => item.id === patientId);
    if (!patient) throw new Error("No encontré esta ficha.");
    if (!kinds.has(kind)) throw new Error("Esa práctica no tiene hoja.");
    const previous = patient.consents.find((item) => item.kind === kind);
    if (previous?.fileId) await removeUploads([previous.fileId]);
    const consent: SignedConsent = {
      id: previous?.id ?? crypto.randomUUID(),
      kind,
      signedOn: todayInArgentina(),
      ...uploaded,
    };
    patient.consents = [...patient.consents.filter((item) => item.kind !== kind), consent];
    patient.updatedAt = new Date().toISOString();
    await writeStore(store);
    return patient;
  });
}

export function removePatientRecord(id: string) {
  return turn(async () => {
    const store = await readStore();
    const current = store.patients.find((item) => item.id === id);
    if (current) {
      await removeUploads(current.consents.flatMap((item) => (item.fileId ? [item.fileId] : [])));
    }
    store.patients = store.patients.filter((item) => item.id !== id);
    await writeStore(store);
  });
}
