/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  assetPrefix:
    process.env.NODE_ENV === "production"
      ? "/{https://github.com/ichiburn/Portfolio.git}"
      : "",
  basePath:
    process.env.NODE_ENV === "production"
      ? "/{https://github.com/ichiburn/Portfolio.git}"
      : "",
};

module.exports = nextConfig;
