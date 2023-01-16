import { AppIcon } from "@/assets/icons/app";
import { Form, InputForm, InputPasswordForm } from "@/components/form";
import { InputCheckboxForm } from "@/components/form/input-checkbox-form";
import { HeadHTML } from "@/layout/head-html";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import * as yup from "yup";

export default function Login() {
  const validation = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    rememberLogin: yup.boolean(),
  });

  type FormData = yup.InferType<typeof validation>;

  const methods = useForm<FormData>({
    resolver: yupResolver(validation),
    defaultValues: {
      email: "",
      password: "",
      rememberLogin: true,
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <HeadHTML title="Login" />
      {/* Title App */}
      <Box height="100vh" width="100vw">
        <Container maxWidth="1440px">
          <Flex
            backgroundColor="white"
            height="70px"
            justifyContent="center"
            alignItems="center"
          >
            <AppIcon />
            <Heading ml="20px">Feed4Function</Heading>
          </Flex>
        </Container>
        <Flex
          flex={1}
          height="calc(100vh - 70px)"
          backgroundColor="#EFFFFC" // green background
          justifyContent="center"
          alignItems="center"
        >
          {/* form sign up */}
          <Flex
            backgroundColor="white"
            width="563px"
            pb="20px"
            flexDirection="column"
            borderRadius="9px"
            boxShadow="0px 4px 10px rgba(0, 0, 0, 0.15)"
          >
            <Flex justify="center">
              <Image
                src="/images/create-account.png"
                alt="Create account Image"
                width="226px"
                height="114.5px"
                marginTop="-70px"
              />
            </Flex>
            <Heading
              textAlign="center"
              fontSize="30px"
              fontWeight="bold"
              mt="24px"
              mb="24px"
            >
              Welcome back!
            </Heading>
            <Form methods={methods} onSubmit={onSubmit}>
              <Flex flex={1} direction="column" marginX="60px" gap="20px">
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

                <InputCheckboxForm
                  label="Remember for 30 days"
                  name="rememberLogin"
                />

                <Button
                  borderRadius="100px"
                  height="44px"
                  color="white"
                  backgroundColor="#08979C"
                  _hover={{ backgroundColor: "#40A9AC" }}
                  type="submit"
                >
                  Log In
                </Button>

                <Flex justifyContent="center" alignItems="center">
                  <NextLink href="/forgot-password" passHref>
                    <Link
                      as="div"
                      color="#08979C"
                      fontSize="14px"
                      fontWeight="600"
                    >
                      Forgot Password
                    </Link>
                  </NextLink>
                </Flex>

                <Flex justifyContent="center" alignItems="center">
                  <Text fontWeight="400" color="#667085">
                    Don&apos;t have an account?&nbsp;
                  </Text>
                  <NextLink href="/register" passHref>
                    <Link
                      as="div"
                      color="#08979C"
                      fontSize="14px"
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
