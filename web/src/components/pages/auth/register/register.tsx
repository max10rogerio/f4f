import { Form, InputForm, InputPasswordForm } from "@/components/form";
import { AuthService } from "@/services";
import {
  Button,
  Flex,
  Heading,
  Image,
  Link,
  Text,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import * as yup from "yup";

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const validation = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  confirmPassword: yup
    .string()
    .label("Confirm password")
    .required()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export type RegisterFormProps = {
  onFinished: (email: string) => void;
};

export const RegisterForm = (props: RegisterFormProps) => {
  const toast = useToast();
  const methods = useForm<FormData>({
    resolver: yupResolver(validation),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await AuthService.register(
        data.name,
        data.email,
        data.password,
        data.confirmPassword
      );

      toast({
        description: "Register successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });

      props.onFinished(data.email);
    } catch (error: any) {
      toast({
        title: "An error occurred.",
        description: error.message,
        status: "error",
      });
    }
  };

  return (
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
        flexDirection="column"
        borderRadius="9px"
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.15)"
        pb="20px"
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
          Create an account
        </Heading>
        <Form methods={methods} onSubmit={onSubmit}>
          <Flex flex={1} direction="column" marginX="60px" gap="20px">
            <InputForm
              inputProps={{ autoFocus: true }}
              name="name"
              label="Name"
              placeholder="Enter your name"
              isRequired
            />

            <InputForm
              label="Email"
              name="email"
              isRequired
              placeholder="Enter your email"
            />

            <InputPasswordForm
              label="Password"
              name="password"
              isRequired
              placeholder="Create a password"
            />

            <InputPasswordForm
              label="Confirm Password"
              name="confirmPassword"
              isRequired
              placeholder="Confirm a password"
            />

            <Button
              borderRadius="100px"
              height="44px"
              color="white"
              backgroundColor="#08979C"
              _hover={{ backgroundColor: "#40A9AC" }}
              type="submit"
              isLoading={methods.formState.isSubmitting}
            >
              Get started
            </Button>

            <Flex justifyContent="center" alignItems="center">
              <NextLink href="/forgot-password" passHref>
                <Link as="div" color="#08979C" fontSize="14px" fontWeight="600">
                  Forgot Password
                </Link>
              </NextLink>
            </Flex>

            <Flex justifyContent="center" alignItems="center">
              <Text fontWeight="400" color="#667085">
                Already have an account?&nbsp;
              </Text>
              <NextLink href="/login" passHref>
                <Link as="div" color="#08979C" fontSize="14px" fontWeight="600">
                  Log in
                </Link>
              </NextLink>
            </Flex>
          </Flex>
        </Form>
      </Flex>
    </Flex>
  );
};
