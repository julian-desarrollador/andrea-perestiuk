"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  consultorioPassword,
  requireSession,
  sessionCookieOptions,
} from "@/lib/consultorio/guard";
import { sameSecret, sessionCookie, sessionToken } from "@/lib/consultorio/session";
import {
  addPatientRecord,
  removePatientRecord,
  saveFeeRecord,
  savePatientRecord,
  saveSignature,
} from "@/lib/consultorio/store";
import type { ConsentKind, FeeItem, Patient } from "@/lib/consultorio/types";

export async function login(_prev: { error: string } | null, formData: FormData) {
  const expected = consultorioPassword();
  if (!expected) {
    return { error: "Falta configurar la clave del consultorio en el servidor." };
  }
  const password = String(formData.get("password") ?? "");
  if (!sameSecret(password, expected)) {
    return { error: "La clave no coincide." };
  }
  const jar = await cookies();
  jar.set(sessionCookie, await sessionToken(expected), sessionCookieOptions());
  redirect("/consultorio");
}

export async function logout() {
  const jar = await cookies();
  jar.delete(sessionCookie);
  redirect("/consultorio/ingreso");
}

export async function createPatient(formData: FormData) {
  await requireSession();
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return;
  const patient = await addPatientRecord(name);
  redirect(`/consultorio/pacientes/${patient.id}`);
}

export async function savePatientFields(input: unknown): Promise<{ error: string } | { ok: true }> {
  await requireSession();
  try {
    await savePatientRecord(input);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "No se pudo guardar." };
  }
  return { ok: true };
}

export async function guardarFirma(formData: FormData): Promise<{ error: string } | { patient: Patient }> {
  await requireSession();
  const patientId = String(formData.get("patientId") ?? "");
  const kind = String(formData.get("kind") ?? "") as ConsentKind;
  const scan = formData.get("scan");
  if (!(scan instanceof File) || scan.size === 0) {
    return { error: "No llegó la foto." };
  }
  try {
    const patient = await saveSignature(patientId, kind, scan);
    return { patient };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "No se pudo guardar la foto." };
  }
}

export async function deletePatient(id: string) {
  await requireSession();
  await removePatientRecord(id);
  redirect("/consultorio/pacientes");
}

export async function saveOneFee(input: unknown): Promise<{ error: string } | { fee: FeeItem }> {
  await requireSession();
  try {
    const fee = await saveFeeRecord(input);
    return { fee };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "No se pudo guardar el precio." };
  }
}
