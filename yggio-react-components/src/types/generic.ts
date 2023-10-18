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
