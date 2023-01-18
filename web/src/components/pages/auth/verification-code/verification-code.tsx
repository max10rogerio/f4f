import { EmailVerificationIcon } from "@/assets/icons/email-verification";
import { AuthService } from "@/services";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Link,
  PinInput,
  PinInputField,
  Text,
  useToast,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useState } from "react";

export type VerificationCodeProps = {
  email: string;
  code?: string;
  onVerificationFinished: () => void;
};

export const VerificationCode = (props: VerificationCodeProps) => {
  const toast = useToast();
  const [code, setCode] = useState(props.code || "");
  const [isVerifying, setIsVerifying] = useState(false);

  const onHandleResendCode = async () => {
    await AuthService.resendCode(props.email);

    toast({
      title: "Verification code sent",
      description: "We have sent you a new email with verification code",
      status: "info",
      position: "top-right",
      isClosable: true,
    });
  };

  const onVerifyCode = async () => {
    setIsVerifying(true);
    try {
      await AuthService.verifyCode(props.email, code);
      setIsVerifying(false);

      props.onVerificationFinished();
    } catch (error) {
      setIsVerifying(false);

      toast({
        title: "Verification failed",
        description: "Your verification code is incorrect",
        status: "error",
        position: "top-right",
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      backgroundColor="white"
      flexDirection="column"
      width="43.5rem"
      borderRadius=".5625rem"
      boxShadow="0rem .25rem .625rem rgba(0, 0, 0, 0.15)"
      px="3.25rem"
      justify="center"
    >
      <EmailVerificationIcon mt="3.75rem" mb="2rem" />
      <Heading fontSize="1.875rem" fontWeight="bold" textAlign="center">
        Check your email
      </Heading>
      <Text
        fontSize="1rem"
        fontWeight="400"
        textAlign="center"
        color="palette.gray.medium"
      >
        We sent a verification link to
      </Text>
      <Text
        fontSize="1rem"
        fontWeight="bold"
        textAlign="center"
        color="palette.gray.medium"
      >
        {props.email}
      </Text>
      <HStack mt="2rem" justify="center">
        <PinInput
          size="lg"
          placeholder=""
          defaultValue={props.code}
          onComplete={setCode}
        >
          <PinInputField height="5rem" width="5rem" />
          <PinInputField height="5rem" width="5rem" />
          <PinInputField height="5rem" width="5rem" />
          <Box
            border="none"
            borderRadius="0"
            width="1.25rem"
            height=".5rem"
            backgroundColor="#D0D5DD"
          />
          <PinInputField height="5rem" width="5rem" />
          <PinInputField height="5rem" width="5rem" />
          <PinInputField height="5rem" width="5rem" />
        </PinInput>
      </HStack>
      <Flex justify="center">
        <Button
          variant="green"
          width="22.5rem"
          my="2rem"
          onClick={onVerifyCode}
          isLoading={isVerifying}
        >
          Verify email
        </Button>
      </Flex>
      <Text
        fontSize="1rem"
        fontWeight="400"
        color="palette.gray.medium"
        textAlign="center"
      >
        Didn&apos;t receive the email?&nbsp;
        <Text
          as="span"
          color="palette.purple.link"
          onClick={onHandleResendCode}
          cursor="pointer"
        >
          Click to resend
        </Text>
      </Text>
      <Text
        fontWeight="400"
        color="palette.gray.medium"
        textAlign="center"
        mt="1.5rem"
        mb="3.75rem"
      >
        Already have an account?&nbsp;
        <NextLink href="/login" passHref>
          <Link as="span" color="palette.purple.link">
            Log in
          </Link>
        </NextLink>
      </Text>
    </Flex>
  );
};
