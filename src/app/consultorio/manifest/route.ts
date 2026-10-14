export function GET() {
  return Response.json(
    {
      name: "Consultorio",
      short_name: "Consultorio",
      start_url: "/consultorio",
      scope: "/consultorio",
      display: "standalone",
      background_color: "#f3f1eb",
      theme_color: "#3c544b",
      icons: [
        { src: "/apple-icon", sizes: "180x180", type: "image/png", purpose: "any" },
        { src: "/icon", sizes: "32x32", type: "image/png", purpose: "any" },
      ],
    },
    {
      headers: { "Content-Type": "application/manifest+json" },
    },
  );
}
