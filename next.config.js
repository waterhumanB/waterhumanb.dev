/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  output: "export",
  distDir: "out",
  trailingSlash: true,
  basePath: "/waterhumanb.dev",
  assetPrefix: "/waterhumanb.dev",
  images: {
    unoptimized: true,
  },
  // headers는 output: export와 함께 사용할 수 없음
  // rewrites는 output: export와 함께 사용할 수 없음
}

module.exports = nextConfig
