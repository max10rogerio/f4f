import { IconButton } from "@chakra-ui/button";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { forwardRef } from "@chakra-ui/system";
import { useState } from "react";
import { Input, InputProps } from "./input";

export type InputPasswordProps = InputProps;

export const InputPassword = forwardRef((props: InputPasswordProps, ref) => {
  const [visible, setVisible] = useState(false);
  const Icon = visible ? ViewOffIcon : ViewIcon;
  const type = visible ? "text" : "password";
  const toggle = () => setVisible(!visible);

  return (
    <Input
      {...props}
      rightElement={
        <IconButton
          borderRadius="100%"
          mr="2"
          variant="unstyled"
          height="8"
          onClick={toggle}
          aria-label="Toggle Password View"
          icon={<Icon />}
        />
      }
      type={type}
      ref={ref}
    />
  );
});
