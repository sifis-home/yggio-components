/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
const withImages = require('next-images')
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = () => {
  return withImages({
    basePath: '/control-panel-v2',
    images: {
      disableStaticImages: true
    },
    experimental: {
      // this will allow nextjs to resolve files (js, ts, css)
      // outside packages/app directory.
      externalDir: true,
      esmExternals: 'loose'
    },
    publicRuntimeConfig: {
      ...process.env
    },
    reactStrictMode: true,
    webpack: (config) => {
      return {
        externals: {
          bufferutil: "bufferutil",
          "utf-8-validate": "utf-8-validate",
          "react": "react",
          "react-dom": "react-dom",
          "styled-components": "styled-components"
        },
        ...config,
      }
    },
    async redirects() {
      return [
        {
          source: '/devices/:_id',
          destination: '/devices/:_id/general-info',
          permanent: true,
        },
      ]
    },
  })
};

module.exports = nextConfig;
