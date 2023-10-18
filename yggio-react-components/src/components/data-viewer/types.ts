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
