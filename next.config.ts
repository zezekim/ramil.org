import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The CV lives outside public/ so downloads are served by the /cv-infra.pdf
  // route and can be reported. Tracing keeps the file in the deployed bundle.
  outputFileTracingIncludes: {
    "/cv-infra.pdf": ["./assets/cv-infra.pdf"],
  },
};

export default nextConfig;
