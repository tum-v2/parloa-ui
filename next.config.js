// eslint-disable-next-line tsdoc/syntax
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  env: {
    NEXT_PUBLIC_SIMULATION_API_URL: process.env.NEXT_PUBLIC_SIMULATION_API_URL,
  },
};

module.exports = nextConfig;
