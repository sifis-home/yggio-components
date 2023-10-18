/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const {parse} = require('url');
const next = require('next');
const rabbit = require('yggio-rabbit');
const {startUp} = require('yggio-micro-service-base');
const {logger} = require('yggio-logger');

const dev = process.env.NODE_ENV !== 'production';

const {createServer} = require('http');

const port = 80;
const hostname = 'localhost';

const app = next({dev, hostname, port});
const handle = app.getRequestHandler();

const httpOptions = {};

const start = async currentConfig => {
  app.prepare().then(() => {
    createServer(httpOptions, (req, res) => {
      const parsedUrl = parse(req.url, true);
      req.config = currentConfig;
      handle(req, res, parsedUrl);
    }).listen(port, err => {
      if (err) throw err;
      // eslint-disable-next-line no-console
      console.log(`> Server started on https://localhost:${port}`);
    });
  });
};

startUp('control-panel-v2', start, logger, rabbit);
