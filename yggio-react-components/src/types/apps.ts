/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

interface App {
  id: string;
  name: string;
  tagline: string;
  tags?: string[];
  images?: {
    icon: string,
    screenshots?: string[],
  },
  metadata?: {
    softwareQuality: number;
  },
  description?: string,
  url?: string;
  demoUrl?: string;
  support?: string;
  public?: boolean;
}

export type {
  App,
};
