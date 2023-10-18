﻿/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import dynamic from 'next/dynamic';

const DynamicLogsPane = dynamic(
  () => import('yggio-react-components').then(mod => mod.LogsPane),
  {ssr: false}
);

const LogsPane = () => {
  return (
    <DynamicLogsPane />
  );
};

export default LogsPane;
