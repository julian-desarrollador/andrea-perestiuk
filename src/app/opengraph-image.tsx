import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { hero } from "@/content/site";

export const alt = "Andrea Perestiuk · Odontología integral";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";

export default async function Image() {
  const [sans, serif, serifItalic] = await Promise.all([
    readFile(join(process.cwd(), "src/fonts/dm-sans.woff")),
    readFile(join(process.cwd(), "src/fonts/cormorant-garamond.woff")),
    readFile(join(process.cwd(), "src/fonts/cormorant-garamond-italic.woff")),
  ]);

  const lines = hero.phrase.split(". ").map((line, index, all) =>
    index < all.length - 1 ? `${line}.` : line,
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F3F1EB",
          backgroundImage:
            "radial-gradient(circle at 18% 18%, rgba(212,180,130,0.55), transparent 36%), radial-gradient(circle at 84% 10%, rgba(166,184,160,0.55), transparent 34%)",
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "DM Sans",
            fontSize: 28,
            letterSpacing: 6,
            color: "#3C544B",
          }}
        >
          ANDREA PERESTIUK
        </div>
        <div
          style={{
            width: 88,
            height: 2,
            backgroundColor: "#D4B482",
            marginTop: 18,
          }}
        />
        <div
          style={{
            display: "flex",
            fontFamily: "Cormorant",
            fontStyle: "italic",
            fontSize: 44,
            color: "#D4B482",
            marginTop: 16,
          }}
        >
          odontología integral
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 52,
          }}
        >
          {lines.map((line) => (
            <div
              key={line}
              style={{
                display: "flex",
                fontFamily: "Cormorant",
                fontSize: 72,
                lineHeight: 1.15,
                color: "#3C544B",
              }}
            >
              {line}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "DM Sans", data: sans, style: "normal", weight: 500 },
        { name: "Cormorant", data: serif, style: "normal", weight: 500 },
        { name: "Cormorant", data: serifItalic, style: "italic", weight: 500 },
      ],
    },
  );
}
