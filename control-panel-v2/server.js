/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
const {createServer} = require('https');
const {parse} = require('url');
const next = require('next');
const fs = require('fs');
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();
const httpsOptions = {
  key: fs.readFileSync('../../../tools/skaffold/certs/yggio.pem'),
  cert: fs.readFileSync('../../../tools/skaffold/certs/yggio.crt'),
};
app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(443, (err) => {
    if (err) throw err;
    console.log('> Server started on https://localhost:443');
  });
});
