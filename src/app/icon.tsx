import { mark } from "@/lib/brand-icon";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";
export const runtime = "nodejs";

export default function Icon() {
  return mark(size);
}
