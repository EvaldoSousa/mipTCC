/* eslint-disable prettier/prettier */
/** @type {import('next').NextConfig} */

const nextConfig = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.externals.push({
          'utf-8-validate': 'commonjs utf-8-validate',
          'bufferutil': 'commonjs bufferutil',
        })
        return config
      },
    env: {
        HOST_API: process.env.HOST_API,
    },
    output: 'standalone',
}
module.exports = nextConfig
