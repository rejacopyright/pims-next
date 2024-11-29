/** @type {import('next').NextConfig} */

import bundleAnalyzer from '@next/bundle-analyzer'
import { redirects, rewrites } from 'custom_routes'
import { NextConfig } from 'next'
// import webpack from 'next/dist/compiled/webpack/webpack-lib.js'
// import CopyPlugin from 'copy-webpack-plugin'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const isProduction = process.env.NODE_ENV === 'production'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  useFileSystemPublicRoutes: true,
  // swcMinify: true,
  productionBrowserSourceMaps: false,
  experimental: {
    scrollRestoration: true,
    serverSourceMaps: false,
    optimizePackageImports: ['moment', 'pdfjs-dist'],
    // optimizeCss: true
  },
  compiler: {
    // removeConsole: true,
  },
  // output: 'standalone',
  distDir: 'build',
  sassOptions: {
    includePaths: [path.join(__dirname, '_styles')],
    api: 'modern-compiler',
    silenceDeprecations: [
      'mixed-decls',
      'color-functions',
      'global-builtin',
      'import',
      'legacy-js-api',
    ],
    quietDeps: true,
    // additionalData: `@import "src/styles/variables.scss"; @import "src/styles/mixins.scss";`,
  },
  trailingSlash: false,
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  rewrites: async () => rewrites,
  redirects: async () => redirects,
  webpack: (config, { isServer }) => {
    // config.plugins.push(
    //   new CopyPlugin({
    //     patterns: [
    //       {
    //         from: 'node_modules/react-toastify/dist/react-toastify.esm.mjs.map',
    //         to: path.join(__dirname, 'public/react-toastify.esm.mjs.map'),
    //       },
    //     ],
    //   })
    // )
    // config.module.rules = [
    //   ...config.module.rules,
    //   {
    //     test: /\.s[ac]ss$/i,
    //     use: [
    //       'style-loader',
    //       'css-loader',
    //       {
    //         loader: 'sass-loader',
    //         options: {
    //           api: 'modern-compiler',
    //           sassOptions: {
    //             silenceDeprecations: ['mixed-decls', 'color-functions', 'global-builtin', 'import'],
    //             quietDeps: true,
    //           },
    //         },
    //       },
    //     ],
    //   },
    // ]
    if (isProduction && !isServer && config.optimization.splitChunks.cacheGroups) {
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 1,
        maxSize: 100000,
        minChunks: 1,
        minRemainingSize: 0,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        enforceSizeThreshold: 30000,
        cacheGroups: {
          vendor: {
            // name: 'pims',
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: 'all',
            reuseExistingChunk: true,
          },
        },
      }
    }
    return config
  },
}

const withBundleAnalyzer = bundleAnalyzer({
  enabled: isProduction && process.env.ANALYZE === 'true',
  analyzerMode: 'static',
  openAnalyzer: false,
  // reportFilename: './analyze/client.html',
})

export default withBundleAnalyzer(nextConfig)
