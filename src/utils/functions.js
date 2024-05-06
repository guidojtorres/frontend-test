import axios from "axios";

const server = "";

export function cleanString(str) {
  const noUnderscores = str.replaceAll("-", " ");
  return noUnderscores.charAt(0).toUpperCase() + noUnderscores.slice(1);
}

export async function loadPokemonList(page) {
  let pokemonList = [];
  let offset = page * 20;
  const { data } = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offset}`
  );

  const promises = await data.results.map((result) => axios(result.url));
  (await Promise.all(promises)).map((res) => pokemonList.push(res.data));

  return pokemonList;
}

export async function getCaughtPokemon() {
  const { data } = await axios.get(server + "/api/catched");

  return data;
}

export async function catchPokemon(pokemon) {
  const { data } = await axios.post(server + "/api/catched", pokemon);

  return data;
}

export async function releasePokemon(pokemonId) {
  const { data } = await axios.delete(server + `/api/catched/${pokemonId}`);
  return data;
}
