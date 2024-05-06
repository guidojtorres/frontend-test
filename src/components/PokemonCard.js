import {
  Stack,
  Text,
  Image,
  HStack,
  Badge,
  AspectRatio,
} from "@chakra-ui/react";
import styles from "@/styles/PokemonCard.module.css";
import { useContext } from "react";
import { CaughtPokemonContext } from "@/context";

const Pokeball = () => {
  return (
    <Image
      src={`/pokeball.svg`}
      alt="pokeball"
      width={"20px"}
      height={"20px"}
      className="pokeball"
      position={"absolute"}
      right={5}
      top={5}
    />
  );
};

export default function PokemonCard({ pokemon }) {
  const { caughtPokemon } = useContext(CaughtPokemonContext);
  const isCaught = caughtPokemon.some((poke) => poke.id === pokemon.id);
  return (
    <Stack
      spacing="5"
      boxShadow="xl"
      p="5"
      w="full"
      borderRadius="xl"
      alignItems="center"
      className={styles.cardAnimation}
      minW={"25%"}
      minH={240}
    >
      <AspectRatio w="full" ratio={1}>
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
          alt={pokemon.name}
        />
      </AspectRatio>
      <Text textAlign="center" textTransform="Capitalize">
        {pokemon.name}
      </Text>
      <HStack>
        {pokemon.types.map((type) => (
          <p className={`type-icon type-${type.type.name}`} key={type.slot}>
            {type.type.name}
          </p>
        ))}
      </HStack>
      {isCaught && <Pokeball />}
    </Stack>
  );
}
