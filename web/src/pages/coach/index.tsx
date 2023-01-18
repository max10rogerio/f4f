import { AddOutlineIcon } from "@/assets/icons/add-outline";
import { AppIcon } from "@/assets/icons/app";
import { NotificationIcon } from "@/assets/icons/notification";
import { ProfileIcon } from "@/assets/icons/profile";
import { Input } from "@/components/inputs";
import { COOKIES_KEYS } from "@/configs/constants/cookies";
import { HeadHTML } from "@/layout/head-html";
import { CurrentUserResponse, UserService } from "@/services/user.service";
import {
  Button,
  Container,
  Flex,
  Heading,
  IconButton,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { getCookie } from "cookies-next";
import type { GetServerSideProps } from "next";
import NextLink from "next/link";
import type { PropsWithChildren } from "react";

type LinkTabButtonProps = {
  href: string;
  active?: boolean;
};

const LinkTabButton = (props: PropsWithChildren<LinkTabButtonProps>) => {
  return (
    <NextLink href={props.href} passHref>
      <Flex
        as="button"
        flex={1}
        borderBottom={props.active ? ".3125rem solid black" : "none"}
        width="8.25rem"
        justify="center"
        height="5.6875rem"
        alignItems="center"
        fontWeight={props.active ? "bold" : "normal"}
        fontSize="1.125rem"
      >
        {props.children}
      </Flex>
    </NextLink>
  );
};

type CardItemProps = {
  title: string;
  description: string;
  buttonLabel: string;
  buttonLink: string;
};

const CardItem = (props: CardItemProps) => {
  return (
    <Flex
      flex={1}
      direction="column"
      width="360px"
      py="24px"
      px="16px"
      backgroundColor="palette.green.light"
      borderRadius="12px"
      boxShadow="lg"
    >
      <Text fontSize="16px" fontWeight="bold">
        {props.title}
      </Text>
      <Text fontSize="14px" my="32px">
        {props.description}
      </Text>
      <Flex justify="flex-end">
        <NextLink href={props.buttonLink} passHref>
          <Button variant="green">{props.buttonLabel}</Button>
        </NextLink>
      </Flex>
    </Flex>
  );
};

type CoachHomeProps = {
  user: CurrentUserResponse;
};

export default function CoachHome(props: CoachHomeProps) {
  return (
    <>
      <HeadHTML title="Coach Home" />
      <Flex
        flex={1}
        direction="column"
        width="100vw"
        background="palette.gray.light"
      >
        <Container maxWidth="1440px">
          <Flex flex={1} height="91px" alignItems="center">
            <Flex mr="5rem" ml="3.9375rem">
              <AppIcon />
            </Flex>
            <Flex w="20rem">
              <Input
                label=""
                name=""
                placeholder="Search Clients"
                inputProps={{
                  borderRadius: "3.6875rem",
                }}
                mr="4.3125rem"
              />
            </Flex>
            <Flex gap=".625rem" mr="6.8125rem">
              <LinkTabButton href="/coach" active>
                Home
              </LinkTabButton>
              <LinkTabButton href="/coach/inbox">Inbox</LinkTabButton>
              <LinkTabButton href="/coach/clients">Clients</LinkTabButton>
              <LinkTabButton href="/coach/templates">Templates</LinkTabButton>
            </Flex>

            <Flex gap="1.1875rem">
              <NotificationIcon w="2rem" h="2rem" />
              <ProfileIcon w="2rem" h="2rem" />
            </Flex>
          </Flex>
        </Container>
      </Flex>
      <hr />
      <Flex flex={1} height="129px" background="palette.green.light">
        <Container maxWidth="1440px">
          <Flex
            width="100%"
            flex={1}
            height="129px"
            px="108px"
            pt="28px"
            pb="26px"
            align="center"
            justify="space-between"
          >
            <Heading>
              Hey there, Coach {props.user?.name?.split(" ")[0]}
            </Heading>
            <IconButton
              aria-label="Add"
              icon={<AddOutlineIcon width="45px" height="45px" />}
              _hover={{
                backgroundColor: "palette.green.hover",
              }}
              borderRadius="50%"
              width="79px"
              height="79px"
              backgroundColor="palette.green.dark"
              mr="38px"
            />
          </Flex>
        </Container>
      </Flex>
      {/* TODO - change fixed height to flex height dynamic */}
      <Flex flex={1} background="palette.gray.light" height="76vh">
        <Container maxWidth="1440px" mt="17px" background="palette.gray.light">
          <Flex
            direction="column"
            justify="center"
            borderRadius="10px"
            boxShadow="md"
            p="50px"
            background="white"
          >
            <Text
              textAlign="center"
              mt="48px"
              fontWeight="1000"
              fontSize="1.5rem"
            >
              Get Started Here!
            </Text>
            <Text textAlign="center" fontSize="20px">
              Complete these steps first so you get the most out of
              Feed4Function
            </Text>
            <SimpleGrid
              columns={{ base: 1, md: 3 }}
              gap={{ base: 10, md: 0 }}
              mt="80px"
            >
              <CardItem
                title="Personalize Coach Profile"
                description="Add your photo, bio, and other details to your coach profile."
                buttonLabel="Start"
                buttonLink="/coach/profile"
              />
              <CardItem
                title="Create Client Type Categories"
                description="Create categories to group your clients by type."
                buttonLabel="Create Categories"
                buttonLink="/coach/client/categories"
              />
              <CardItem
                title="Create Intake from Template"
                description="Create an intake form for your clients to fill out."
                buttonLabel="Create Form"
                buttonLink="/coach/templates"
              />
            </SimpleGrid>
          </Flex>
        </Container>
      </Flex>
    </>
  );
}

// get server side props
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = getCookie(COOKIES_KEYS.TOKEN, { req: ctx.req, res: ctx.res });

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const user = await UserService.currentUser(token as string);

  return {
    props: {
      user,
    },
  };
};
