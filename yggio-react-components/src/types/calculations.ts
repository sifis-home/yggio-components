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
