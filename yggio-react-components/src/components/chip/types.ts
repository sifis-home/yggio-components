interface ChipProps {
  text?: string;
  color?: string;
  ghosted?: boolean;
  showRemoveButton?: boolean;
  onRemoveClick?: () => void;
  margin?: string;
}

export default ChipProps;
