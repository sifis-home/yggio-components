interface ContainerBoxProps {
  position?: string;
  display?: string;
  flexDirection?: string;
  width?: string;
  widthReduction?: string;
  maxWidth?: string;
  minWidth?: string;
  height?: string;
  heightReduction?: string;
  minHeight?: string;
  margin?: string;
  padding?: string;
  background?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

export default ContainerBoxProps;
