import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ignora errores de lint en producción
  },
};

export default nextConfig;
