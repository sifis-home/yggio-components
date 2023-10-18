/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */


// This has to be here because eslint dont seem to understand type when exporting from tsx files
interface InputDecoratorProps {
  label?: string,
  isOptional?: boolean,
  isRequired?: boolean,
  width?: string,
  fullHeight?: boolean,
  margin?: string,
  helperText?: string,
  additionalInfo?: string,
  validationErrorMessage?: string | null,
  validationSuccessMessage?: string | null,
  children?: React.ReactNode,
}


export type {
  InputDecoratorProps
};
