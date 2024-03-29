import {
  EmailVerified,
  RegisterForm,
  VerificationCode,
} from "@/components/pages/auth";
import { AuthHeader } from "@/layout/auth";
import { HeadHTML } from "@/layout/head-html";
import { Box, Fade, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Tabs = "register" | "verification" | "email-verified";

export default function Register() {
  const { query } = useRouter();
  const [currentForm, setCurrentForm] = useState<Tabs>("register");
  const [email, setEmail] = useState<string>("");

  const onFinishedRegister = (email: string) => {
    setEmail(email);
    setCurrentForm("verification");
  };

  const onFinishedVerification = () => {
    setCurrentForm("email-verified");
  };

  useEffect(() => {
    if (query?.email && query?.code) {
      setEmail(query.email as string);
      setCurrentForm("verification");
    }
  }, [query]);

  return (
    <>
      <HeadHTML title="Register" />
      {/* Title App */}
      <Box height="100vh" width="100vw">
        <AuthHeader />
        <Flex
          flex={1}
          height="calc(100vh - 4.375rem)"
          backgroundColor="palette.green.light" // green background
          justifyContent="center"
          alignItems="center"
        >
          {currentForm === "register" && (
            <RegisterForm onFinished={onFinishedRegister} />
          )}
          {currentForm === "verification" && (
            <Fade in>
              <VerificationCode
                email={email}
                code={query?.code as string}
                onVerificationFinished={onFinishedVerification}
              />
            </Fade>
          )}
          {currentForm === "email-verified" && <EmailVerified />}
        </Flex>
      </Box>
    </>
  );
}
