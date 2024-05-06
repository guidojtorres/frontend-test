import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  HStack,
  Heading,
  Text,
} from "@chakra-ui/react";
import PokemonData from "./PokemonData";
const PokemonDataModal = ({ selectedPokemon, pokemonDataModal }) => {
  return (
    <Modal isOpen={pokemonDataModal.isOpen} onClose={pokemonDataModal.onClose}>
      <ModalOverlay />
      <ModalContent mx={4} w={"100%"} maxW={{ base: "90%", xl: "610px" }}>
        <ModalHeader textTransform="capitalize">
          <HStack alignItems={"center"}>
            <Heading size={"lg"}>{selectedPokemon?.name}</Heading>
            <Text color={"GrayText"}>#{selectedPokemon?.id}</Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody p={0}>
          {selectedPokemon && <PokemonData pokemon={selectedPokemon} />}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PokemonDataModal;
