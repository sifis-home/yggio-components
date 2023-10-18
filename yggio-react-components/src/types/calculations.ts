/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

interface Source {
  sourceId: string;
  path: string;
  currentValue: object;
}

interface CalcType {
  grouping?: {
    fn: string;
    type: string;
    time: string;
  },
  groupingCalcs: string[];
}

interface Interval {
  from: Date;
  to: Date;
}

interface Calculate {
  calcType: CalcType;
  interval: Interval;
}

interface Destination {
  mongoId: string;
  path: string;
}

interface Calculation {
  _id: string;
  name: string;
  type: string;
  sources: Source[];
  calculation: Calculate;
  destination: Destination;
  automaticUpdate: string;
}

interface CalculationValue {
  id: string;
  name: string;
  value: number;
  date: string;
  from: string;
  to: string;
}

type Calculations = Calculation[];
type IdKeyedCalculations = {[_id: string]: Calculation};

export type {
  CalcType,
  Interval,
  Calculate,
  Calculation,
  CalculationValue,
  Calculations,
  IdKeyedCalculations,
};
