import { Pokemon } from '../models/pokemon';
import { PokemonIdRequestResponse } from '../services/pokemonService';

export const mapPokemonResponseToPokemon = (
  response: PokemonIdRequestResponse,
): Pokemon => {
  const weight = Number(response.weight);
  const height = Number(response.height);
  const weightInKg = weight / 10; //according to the API, weight is in hectograms
  const heightInCm = height * 10; //according to the API, height is in decimetres
  return new Pokemon(response.name, weightInKg, heightInCm);
};
