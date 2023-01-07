/** @type {import('next').NextConfig} */
const devApiRoot = 'https://fvtht2i9p8.execute-api.ap-northeast-1.amazonaws.com/dev'
const prodApiRoot = 'https://fvtht2i9p8.execute-api.ap-northeast-1.amazonaws.com/prod'

const nextConfig = () => {
  const isProd = process.env.STAGE === 'prod'
  return {
    reactStrictMode: true,
    swcMinify: true,
    env: {
      NEXT_PUBLIC_API_ROOT: isProd ? prodApiRoot : devApiRoot,
      NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: 'G-B6PKRV3YPG',
    },
    async redirects() {
      return [
        {
          source: '/',
          destination: '/episode',
          permanent: true,
        },
      ]
    },
  }
}

module.exports = nextConfig
