
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
