/** @type {import('next').NextConfig} */
const repoName = "marveile.id-demo";
const isProd = process.env.NODE_ENV === "production" && process.env.GITHUB_ACTIONS;

const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "down-id.img.susercontent.com" }
    ]
  },
  trailingSlash: true,
  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}` : ""
};
export default nextConfig;
