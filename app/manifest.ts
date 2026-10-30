import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ecoa Memórias",
    short_name: "Ecoa",
    lang: "pt-BR",
    start_url: "/",
    display: "browser",
    background_color: "#F5EFE4",
    theme_color: "#1F3D33",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
