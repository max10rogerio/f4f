import { AppIcon } from "@/assets/icons/app";
import { Container, Flex, Heading } from "@chakra-ui/react";

export const AuthHeader = () => (
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
);
