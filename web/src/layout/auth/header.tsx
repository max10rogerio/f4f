import { AppIcon } from "@/assets/icons/app";
import { Container, Flex, Heading } from "@chakra-ui/react";

export const AuthHeader = () => (
  <Container maxWidth="90rem">
    <Flex
      backgroundColor="white"
      height="4.375rem"
      justifyContent="center"
      alignItems="center"
    >
      <AppIcon />
      <Heading ml="1.25rem">Feed4Function</Heading>
    </Flex>
  </Container>
);
