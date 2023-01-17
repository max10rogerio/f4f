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
import { useRouter } from "next/router";
import { useState } from "react";

export type VerificationCodeProps = {
  email: string;
  code?: string;
};

export const VerificationCode = (props: VerificationCodeProps) => {
  const router = useRouter();
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

      toast({
        title: "Email verified",
        description: "Your email has been verified",
        status: "success",
        position: "top-right",
        isClosable: true,
      });

      router.push("/login");
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
      width="696PX"
      borderRadius="9px"
      boxShadow="0px 4px 10px rgba(0, 0, 0, 0.15)"
      px="52px"
      justify="center"
    >
      <EmailVerificationIcon mt="60px" mb="32px" />
      <Heading fontSize="30px" fontWeight="bold" textAlign="center">
        Check your email
      </Heading>
      <Text fontSize="16px" fontWeight="400" textAlign="center" color="#667085">
        We sent a verification link to
      </Text>
      <Text
        fontSize="16px"
        fontWeight="bold"
        textAlign="center"
        color="#667085"
      >
        {props.email}
      </Text>
      <HStack mt="32px" justify="center">
        <PinInput
          size="lg"
          placeholder=""
          defaultValue={props.code}
          onComplete={setCode}
        >
          <PinInputField height="80px" width="80px" />
          <PinInputField height="80px" width="80px" />
          <PinInputField height="80px" width="80px" />
          <Box
            border="none"
            borderRadius="0"
            width="20px"
            height="8px"
            backgroundColor="#D0D5DD"
          />
          <PinInputField height="80px" width="80px" />
          <PinInputField height="80px" width="80px" />
          <PinInputField height="80px" width="80px" />
        </PinInput>
      </HStack>
      <Flex justify="center">
        <Button
          variant="green"
          width="360px"
          my="32px"
          onClick={onVerifyCode}
          isLoading={isVerifying}
        >
          Verify email
        </Button>
      </Flex>
      <Text fontSize="16px" fontWeight="400" color="#667085" textAlign="center">
        Didn&apos;t receive the email?&nbsp;
        <Text
          as="span"
          color="#6941C6"
          onClick={onHandleResendCode}
          cursor="pointer"
        >
          Click to resend
        </Text>
      </Text>
      <Text
        fontWeight="400"
        color="#667085"
        textAlign="center"
        mt="24px"
        mb="60px"
      >
        Already have an account?&nbsp;
        <NextLink href="/Login" passHref>
          <Link as="span" color="#6941C6">
            Log in
          </Link>
        </NextLink>
      </Text>
    </Flex>
  );
};
