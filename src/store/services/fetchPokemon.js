import {fetchUrl} from "../utils/fetchUrl.mjs";

export async function fetchPokemon() {
    const pokemonName = "jolteon".toLowerCase();
    const urlOfPokemon = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    const dataOfPokemon=await fetchUrl(urlOfPokemon); 
    return dataOfPokemon;
}

