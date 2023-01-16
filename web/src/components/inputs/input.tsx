import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  forwardRef,
  Input as CInput,
  InputGroup,
  InputLeftElement,
  InputProps as CInputProps,
  InputRightElement,
} from "@chakra-ui/react";
import { RegisterOptions } from "react-hook-form";

type InputTypes =
  | "text"
  | "password"
  | "color"
  | "date"
  | "datetime-local"
  | "number"
  | "file";

type CustomProps = {
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  label: string;
  name: string;
  placeholder?: string;
  type?: InputTypes;
  errorMessage?: string;
  helperMessage?: string;
  registerOptions?: RegisterOptions;
};

type ChakraProps = {
  formControlProps?: FormControlProps;
  inputProps?: CInputProps & Record<string, any>;
};

export type InputProps = CustomProps & ChakraProps & FormControlProps;

/**
 * Pure Input Text component with Chakra UI
 */
export const Input = forwardRef(
  (
    {
      leftElement,
      rightElement,
      formControlProps,
      helperMessage,
      errorMessage,
      inputProps,
      name,
      label,
      placeholder = "",
      type = "text",
      ...props
    }: InputProps,
    ref
  ) => {
    return (
      <FormControl {...props} {...formControlProps}>
        <FormLabel htmlFor={name}>{label}</FormLabel>
        <InputGroup>
          {leftElement && <InputLeftElement>{leftElement}</InputLeftElement>}
          <CInput
            id={name}
            name={name}
            placeholder={placeholder}
            ref={ref}
            type={type}
            {...inputProps}
          />
          {rightElement && (
            <InputRightElement>{rightElement}</InputRightElement>
          )}
        </InputGroup>
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
        {!errorMessage && <FormHelperText>{helperMessage}</FormHelperText>}
      </FormControl>
    );
  }
);
