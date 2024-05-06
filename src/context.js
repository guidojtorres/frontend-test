import { createContext, useState, useEffect } from "react";
import { getCaughtPokemon } from "@/utils/functions";

export const CaughtPokemonContext = createContext();

export function CaughtPokemonProvider({ children }) {
  const [caughtPokemon, setCaughtPokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getCaughtPokemon()
      .then((data) => setCaughtPokemon(data))
      .catch((error) => console.alert(error))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    !isLoading && (
      <CaughtPokemonContext.Provider
        value={{ caughtPokemon, setCaughtPokemon }}
      >
        {children}
      </CaughtPokemonContext.Provider>
    )
  );
}
