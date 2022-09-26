/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
const PnpWebpackPlugin = require(`pnp-webpack-plugin`);

async function yarn2Config(config, options) {
  const newConfig = {
    ...(config || {}),
    resolve: {
      ...((config || {}).resolve || {}),
      plugins: [
        ...(((config || {}).resolve || {}).plugins || []),
        PnpWebpackPlugin
      ]
    },
    resolveLoader: {
      ...((config || {}).resolveLoader || {}),
      plugins: [
        ...(((config || {}).resolveLoader || {}).plugins || []),
        PnpWebpackPlugin.moduleLoader(module)
      ]
    }
  };
  const jsRule = newConfig.module.rules.find(rule => rule.test.test(".js"));
  jsRule.exclude = /node_modules/;

  return newConfig;
}

module.exports = { managerWebpack: yarn2Config, webpack: yarn2Config };

