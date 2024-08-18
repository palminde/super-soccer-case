import { PokemonIdRequestResponse } from '../services/pokemonService';
import { Player } from './commonModel';
export class Pokemon extends Player {
  constructor(name: string, weight: number, height: number) {
    super(name, weight, height);
  }

  static fromPokemonApiResponse(
    pokemonApiResponse: PokemonIdRequestResponse,
  ): Pokemon {
    const weight = Number(pokemonApiResponse.weight);
    const height = Number(pokemonApiResponse.height);
    const weightInKg = weight / 10; //according to the API, weight is in hectograms
    const heightInCm = height * 10; //according to the API, height is in decimetres
    return new Pokemon(pokemonApiResponse.name, weightInKg, heightInCm);
  }
}
