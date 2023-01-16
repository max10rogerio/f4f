import { Box } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";

export type FormProps = {
  methods: UseFormReturn<any>;
  onSubmit: (...args: any[]) => Promise<void> | void;
};

export const Form = ({
  children,
  methods,
  onSubmit,
}: PropsWithChildren<FormProps>) => {
  return (
    <FormProvider {...methods}>
      <Box w="full" as="form" onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </Box>
    </FormProvider>
  );
};
