import { EmailVerifiedIcon } from "@/assets/icons/email-verified";
import { Button, Flex, Heading, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";

export const EmailVerified = () => {
  return (
    <Flex
      flex={1}
      height="calc(100vh - 4.375rem)"
      backgroundColor="palette.green.light" // green background
      justifyContent="center"
      alignItems="center"
    >
      <Flex
        backgroundColor="white"
        width="35.1875rem"
        flexDirection="column"
        borderRadius="9px"
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.15)"
        pb="1.25rem"
      >
        <Flex justify="center" mt="3.75rem">
          <EmailVerifiedIcon />
        </Flex>
        <Heading
          textAlign="center"
          fontSize="1.875rem"
          fontWeight="bold"
          mt="1.5rem"
          mb="1.5rem"
        >
          Email verified
        </Heading>
        <Flex flex={1} direction="column" marginX="3.75rem" gap="1.25rem">
          <Text
            textAlign="center"
            fontSize="1rem"
            fontWeight="400"
            color="palette.gray.medium"
          >
            Your email is successfully verified.
          </Text>
          <Flex flex={1} justify="center">
            <NextLink href="/login" passHref>
              <Button width="22.5rem" variant="green">
                Continue
              </Button>
            </NextLink>
          </Flex>
          <Flex justifyContent="center" alignItems="center">
            <Text fontWeight="400" color="palette.gray.medium">
              Already have an account?&nbsp;
            </Text>
            <NextLink href="/login" passHref>
              <Link
                as="div"
                color="palette.green.dark"
                fontSize=".875rem"
                fontWeight="600"
              >
                Log in
              </Link>
            </NextLink>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
