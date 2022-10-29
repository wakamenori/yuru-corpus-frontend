/** @type {import('next').NextConfig} */
const devApiRoot = "https://fvtht2i9p8.execute-api.ap-northeast-1.amazonaws.com/dev"
const prodApiRoot = "https://fvtht2i9p8.execute-api.ap-northeast-1.amazonaws.com/prod"

const nextConfig = () => {
  const isProd = process.env.STAGE === "prod"
  return {
    reactStrictMode: true,
    swcMinify: true,
    env: {
      NEXT_PUBLIC_API_ROOT: isProd ? prodApiRoot : devApiRoot
    }
  }
}

module.exports = nextConfig
