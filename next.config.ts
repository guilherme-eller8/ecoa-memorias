import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  // O CSS vai no HTML: o texto do hero pinta sem esperar duas folhas bloqueantes (LCP no celular)
  experimental: { inlineCss: true },
  partialPrefetching: true,
  turbopack: {
    rules: {
      // Só a folha global passa pelo Tailwind; CSS Modules seguem o caminho normal.
      "globals.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
