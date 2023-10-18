/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

type GenericFunctionType = () => void;

interface InputOption {
  value: string;
  label: string;
}

type InputOptions = InputOption[];

interface DeviceModelName {
  value: string;
  displayName: string;
}

type Translate = (key: string, opts?: {defaultValue: string}) => string;

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export type {
  GenericFunctionType,
  InputOptions,
  DeviceModelName,
  Translate,
  DeepPartial,
};
