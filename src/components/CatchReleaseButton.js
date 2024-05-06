import React, { useContext } from "react";
import { Box, Checkbox, useToast } from "@chakra-ui/react";
import { catchPokemon, releasePokemon } from "@/utils/functions";
import { CaughtPokemonContext } from "@/context";
const CatchReleaseButton = ({ pokemonId, pokemonName }) => {
  const { caughtPokemon, setCaughtPokemon } = useContext(CaughtPokemonContext);
  const isCaught = caughtPokemon.some((poke) => poke.id === pokemonId);

  const toast = useToast();

  const handleClick = async () => {
    if (!isCaught) {
      toast.promise(catchPokemon({ id: pokemonId, name: pokemonName }), {
        success: {
          title: "Pokemon captured!",
          description: `${pokemonName} has been added to your collection`,
          isClosable: true,
        },
        error: { title: "Somethin went wrong...", description: "Server error" },
        loading: { title: "Pending...", description: "Please wait" },
      });
      setCaughtPokemon([
        ...caughtPokemon,
        { id: pokemonId, name: pokemonName },
      ]);
    } else {
      toast.promise(releasePokemon(pokemonId), {
        success: {
          title: "Pokemon released to the wild!",
          description: `${pokemonName} has been set free`,
          isClosable: true,
        },
        error: { title: "Somethin went wrong...", description: "Server error" },
        loading: { title: "Pending...", description: "Please wait" },
      });
      const newCaughtPokemonArray = caughtPokemon.filter(
        (pokemon) => pokemon.id !== pokemonId
      );
      setCaughtPokemon(newCaughtPokemonArray);
    }
  };
  return (
    <Box position="absolute" right="0" zIndex="99">
      <Checkbox isChecked={isCaught} onChange={handleClick}>
        {isCaught ? "Release" : "Catch"}
      </Checkbox>
    </Box>
  );
};

export default CatchReleaseButton;
