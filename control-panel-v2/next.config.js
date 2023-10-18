/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const withImages = require('next-images');
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = () => {
  return withImages({
    typescript: {tsconfigPath: './tsconfig.json'},
    basePath: '/control-panel-v2',
    images: {
      disableStaticImages: true
    },
    experimental: {
      optimizePackageImports: ['yggio-react-components'],
      // this will allow nextjs to resolve files (js, ts, css)
      // outside packages/app directory.
      externalDir: true,
      esmExternals: 'loose'
    },
    publicRuntimeConfig: {
      ...process.env
    },
    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
    reactStrictMode: true,
    async redirects () {
      return [
        {
          source: '/devices/:_id',
          destination: '/devices/:_id/general-info',
          permanent: true,
        },
      ];
    },
  });
};

module.exports = nextConfig;
