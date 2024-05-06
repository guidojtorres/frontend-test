import React, { useState } from "react";
import { Button } from "@chakra-ui/react";

import { loadPokemonList } from "@/utils/functions";
const ViewMore = ({ isLoading, updatePokemon }) => {
  const [offset, setOffset] = useState(1);
  async function handleNextPage() {
    const pokemonList = await loadPokemonList(offset);
    updatePokemon((prevState) => [...prevState, ...pokemonList]);
    setOffset(offset + 1);
  }
  return (
    <Button isLoading={isLoading} onClick={handleNextPage}>
      Cargar más
    </Button>
  );
};

export default ViewMore;
