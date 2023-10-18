/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

type DataProps = string | number | object | [];

type DataViewerProps = {
  data: Record<string, DataProps>;
  width?: string;
  margin?: string;
};

export type {
  DataProps,
  DataViewerProps,
};
