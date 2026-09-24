import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export async function mark(size: { width: number; height: number }) {
  const serif = await readFile(join(process.cwd(), "src/fonts/cormorant-garamond.woff"));
  const fontSize = Math.round(size.width * 0.46);
  const ruleWidth = Math.round(size.width * 0.5);
  const ruleHeight = Math.max(2, Math.round(size.width * 0.045));

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
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "Cormorant",
            fontSize,
            lineHeight: 1,
            color: "#3C544B",
          }}
        >
          AP
        </div>
        <div
          style={{
            width: ruleWidth,
            height: ruleHeight,
            backgroundColor: "#D4B482",
            marginTop: Math.round(size.width * 0.06),
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Cormorant", data: serif, style: "normal", weight: 500 }],
    },
  );
}
