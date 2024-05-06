import { cleanString } from "@/utils/functions";
import {
  AspectRatio,
  Image,
  Stack,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Progress,
  Text,
  Tab,
  HStack,
  VStack,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import axios from "axios";
import CatchReleaseButton from "./CatchReleaseButton";
import { useEffect, useState } from "react";
function PokemonStat({ statName, value }) {
  return (
    <Stack>
      <HStack justifyContent={"space-between"}>
        <Text fontSize="sm" fontWeight={700}>
          {cleanString(statName)}
        </Text>
        <Text fontSize="sm" fontWeight={600}>
          {value}
        </Text>
      </HStack>
      <Progress bg="gray.300" borderRadius="full" value={value} />
    </Stack>
  );
}

function PokemonAbility({ name, description, ability }) {
  return (
    <VStack alignItems={"start"} spacing={0} py={3}>
      <Heading size={"sm"} textAlign={"left"}>
        {cleanString(name)}
      </Heading>
      <Text>{description}</Text>
    </VStack>
  );
}

function PokemonMove({ name, accuracy, pp, type, power }) {
  return (
    <>
      <Td>
        <p className={`type-icon type-${type}`}>{type}</p>
      </Td>
      <Td>{cleanString(name)}</Td>
      <Td>{accuracy}</Td>
      <Td>{pp || "-"}</Td>
      <Td>{power}</Td>
    </>
  );
}

export default function PokemonData({ pokemon }) {
  const [pokemonMoves, setPokemonMoves] = useState([]);
  const [pokemonAbilities, setPokemonAbilites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    const movePromises = pokemon.moves.map((move) => axios.get(move.move.url));
    const abilityPromises = pokemon.abilities.map((ability) =>
      axios.get(ability.ability.url)
    );

    const fetchedMoves = (await Promise.all(movePromises)).map(
      (res) => res.data
    );
    const fetchedAbilities = (await Promise.all(abilityPromises)).map(
      (res) => res.data
    );
    setPokemonMoves((prevState) => [...prevState, ...fetchedMoves]);
    setPokemonAbilites((prevState) => [...prevState, ...fetchedAbilities]);
  };

  useEffect(() => {
    setIsLoading(true);
    handleClick();

    setIsLoading(false);
  }, [pokemon]);

  return (
    <Stack spacing="5" pb="5">
      <Stack spacing="5" position="relative">
        <CatchReleaseButton pokemonId={pokemon.id} pokemonName={pokemon.name} />
        <HStack justifyContent={"center"}>
          <AspectRatio w="50%" ratio={1}>
            <Image
              objectFit="contain"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
              w={300}
              h={300}
            />
          </AspectRatio>
        </HStack>

        <Tabs>
          <TabList display={"flex"} justifyContent={"space-around"}>
            <Tab fontWeight={700}>Stats</Tab>
            <Tab fontWeight={700}>Moves</Tab>
            <Tab fontWeight={700}>Abilities</Tab>
          </TabList>

          <TabPanels>
            <TabPanel maxH={350}>
              <Stack spacing="2" p={5} bg="gray.100" borderRadius="xl">
                {pokemon.stats.map((stat) => (
                  <PokemonStat
                    statName={stat.stat.name}
                    value={stat.base_stat}
                    key={stat.stat.name}
                  />
                ))}
              </Stack>
            </TabPanel>
            <TabPanel maxH={350} overflowY={"scroll"}>
              <TableContainer>
                <Table variant={"simple"} maxW={"100%"} overflowX={"none"}>
                  <Thead>
                    <Tr>
                      <Th>Type</Th>
                      <Th>Name</Th>
                      <Th>Accuracy</Th>
                      <Th>Power</Th>
                      <Th>PP</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {pokemonMoves.map((move, i) => (
                      <Tr key={move.id}>
                        <PokemonMove
                          name={move.name}
                          accuracy={move.accuracy}
                          power={move.power}
                          pp={move.pp}
                          type={move.type.name}
                          key={i}
                        />
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel minH={350} maxH={350}>
              {pokemonAbilities.map((ability, i) => (
                <PokemonAbility
                  name={ability.name}
                  ability={ability}
                  description={ability.effect_entries[1].effect}
                  key={i}
                />
              ))}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    </Stack>
  );
}
