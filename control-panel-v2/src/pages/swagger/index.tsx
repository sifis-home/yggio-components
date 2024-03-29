﻿/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';

import specification from './swagger.json';

const SwaggerUI = dynamic(
  async () => import('swagger-ui-react'),
  {ssr: false},
);

const Swagger = () => {
  return <SwaggerUI spec={specification} />;
};

export default Swagger;
