import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";

const theme = extendTheme({
  colors: {
    palette: {
      green: {
        light: "#EFFFFC",
        dark: "#08979C",
        hover: "#40A9AC",
      },
      gray: {
        light: "#FAFAFA",
        medium: "#667085",
      },
      purple: {
        link: "#6941C6",
      },
    },
  },
  components: {
    Button: {
      variants: {
        green: {
          borderRadius: "6.25rem",
          height: "2.75rem",
          color: "white",
          backgroundColor: "palette.green.dark",
          _hover: { backgroundColor: "palette.green.hover" },
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
