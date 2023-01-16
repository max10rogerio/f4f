import {
  Checkbox,
  CheckboxProps,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { makeInputFormProps } from "./_utils";

export type InputCheckboxFormProps = CheckboxProps & {
  name: string;
  label: string;
};

export const InputCheckboxForm = (props: InputCheckboxFormProps) => {
  const { register, formState } = useFormContext();
  const { errorMessage, isInvalid, ...rest } = makeInputFormProps(
    register(props.name),
    formState
  );

  return (
    <FormControl isInvalid={isInvalid}>
      <Checkbox {...rest}>{props.label}</Checkbox>
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};
