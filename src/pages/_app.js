import "@/styles/globals.css";
import "animate.css";
import { ChakraProvider } from "@chakra-ui/react";
import { CaughtPokemonProvider } from "@/context";

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <CaughtPokemonProvider>
        <Component {...pageProps} />
      </CaughtPokemonProvider>
    </ChakraProvider>
  );
}
