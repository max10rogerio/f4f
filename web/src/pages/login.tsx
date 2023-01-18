import { Form, InputForm, InputPasswordForm } from "@/components/form";
import { COOKIES_KEYS } from "@/configs/constants/cookies";
import { AuthHeader } from "@/layout/auth";
import { HeadHTML } from "@/layout/head-html";
import { AuthService } from "@/services";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { setCookie } from "cookies-next";
import { GetServerSideProps } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";

export default function Login() {
  const router = useRouter();
  const validation = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
  });

  type FormData = yup.InferType<typeof validation>;

  const methods = useForm<FormData>({
    resolver: yupResolver(validation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await AuthService.login(data.email, data.password);

      setCookie(COOKIES_KEYS.TOKEN, response.token);

      router.push("/coach");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <HeadHTML title="Login" />
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
          {/* form sign up */}
          <Flex
            backgroundColor="white"
            width="35.1875rem"
            pb="1.25rem"
            flexDirection="column"
            borderRadius=".5625rem"
            boxShadow="0rem .25rem .625rem rgba(0, 0, 0, 0.15)"
          >
            <Flex justify="center">
              <Image
                src="/images/create-account.png"
                alt="Create account Image"
                width="14.125rem"
                height="7.1563rem"
                marginTop="-4.375rem"
              />
            </Flex>
            <Heading
              textAlign="center"
              fontSize="1.875rem"
              fontWeight="bold"
              mt="1.5rem"
              mb="1.5rem"
            >
              Welcome back!
            </Heading>
            <Form methods={methods} onSubmit={onSubmit}>
              <Flex flex={1} direction="column" marginX="3.75rem" gap="1.25rem">
                <InputForm
                  inputProps={{ autoFocus: true }}
                  name="email"
                  label="Email"
                  placeholder="Enter your email"
                  isRequired
                />

                <InputPasswordForm
                  label="Password"
                  name="password"
                  isRequired
                  placeholder="Type your password"
                  helperMessage="Must be at least 8 characters"
                />

                <Button
                  variant="green"
                  type="submit"
                  isLoading={methods.formState.isSubmitting}
                >
                  Log In
                </Button>

                <Flex justifyContent="center" alignItems="center">
                  <NextLink href="/forgot-password" passHref>
                    <Link
                      as="div"
                      color="palette.green.dark"
                      fontSize=".875rem"
                      fontWeight="600"
                    >
                      Forgot Password
                    </Link>
                  </NextLink>
                </Flex>

                <Flex justifyContent="center" alignItems="center">
                  <Text fontWeight="400" color="palette.gray.medium">
                    Don&apos;t have an account?&nbsp;
                  </Text>
                  <NextLink href="/register" passHref>
                    <Link
                      as="div"
                      color="palette.green.dark"
                      fontSize=".875rem"
                      fontWeight="600"
                    >
                      Sign Up
                    </Link>
                  </NextLink>
                </Flex>
              </Flex>
            </Form>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

// get server side props
export const getServerSideProps: GetServerSideProps = async () => {
  // get csrf token from server side to prevent csrf attack on login form
  // csrf token will be stored in cookie
  // and will be sent to server side when login form is submitted
  await AuthService.getCSRFToken();

  return {
    props: {},
  };
};
