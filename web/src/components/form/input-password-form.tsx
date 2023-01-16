import { useFormContext } from "react-hook-form";
import { InputPassword } from "../inputs";
import type { InputProps } from "../inputs";
import { makeInputFormProps } from "./_utils";

export const InputPasswordForm = (props: InputProps) => {
  const { register, formState } = useFormContext();
  const withFormHookProps = makeInputFormProps(register(props.name), formState);

  return <InputPassword {...props} {...withFormHookProps} />;
};
