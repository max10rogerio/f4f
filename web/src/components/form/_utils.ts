import type { FormState, UseFormRegisterReturn } from "react-hook-form";

export type MakeInputFormPropsResponse = UseFormRegisterReturn & {
  isInvalid?: boolean;
  errorMessage?: string;
};

export const makeInputFormProps = (
  { name, ...rest }: UseFormRegisterReturn,
  formState: FormState<any>
): MakeInputFormPropsResponse => {
  return {
    name,
    ...rest,
    isInvalid: !!formState.errors?.[name]?.message,
    errorMessage: formState.errors?.[name]?.message as string,
  };
};
