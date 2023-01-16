import { useFormContext } from "react-hook-form";
import { Input } from "../inputs";
import { makeInputFormProps } from "./_utils";
import type { InputProps } from "../inputs";

/**
 * Input Text integrated with react-hook-form and chakra-ui
 */
export const InputForm = (props: InputProps) => {
  const { register, formState } = useFormContext();
  const { registerOptions, ...rest } = props;
  const withFormHookProps = makeInputFormProps(
    register(props.name, registerOptions),
    formState
  );

  return <Input {...rest} {...withFormHookProps} />;
};
