import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";

const theme = extendTheme({
  components: {
    Button: {
      variants: {
        green: {
          borderRadius: "100px",
          height: "44px",
          color: "white",
          backgroundColor: "#08979C",
          _hover: { backgroundColor: "#40A9AC" },
        },
      },
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
