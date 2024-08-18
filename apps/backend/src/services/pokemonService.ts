import { Pokemon } from '../models/pokemon';
import { randomSampleFromArray } from '../utils/randomSampleFromArray';
import { ApiConfig } from './commonService';

export type PokemonIdRequestResponse = {
  name: string;
  height: string;
  weight: string;
};

type PokemonPaginateRequestRespone = {
  results: { url: string }[];
};

export class PokemonService {
  private static CONFIG: ApiConfig = {
    apiUrl: 'https://pokeapi.co/api/v2',
  };
  private static INSTANCE: PokemonService | undefined;
  private _characterCount: number | undefined;
  static getInstance(): PokemonService {
    if (!this.INSTANCE) {
      this.INSTANCE = new PokemonService();
    }
    return this.INSTANCE;
  }

  public async getRandomPokemons(numberOfPokemons: number): Promise<Pokemon[]> {
    if (!this._characterCount) {
      await this.updateCharacterCount();
    }
    const pokemonCounts = [...Array(this._characterCount).keys()];
    const randomPokemonOffsets = randomSampleFromArray(
      pokemonCounts,
      numberOfPokemons,
    );

    const pokemons = await Promise.all(
      randomPokemonOffsets.map(this.getPokemon),
    );

    return pokemons.map(Pokemon.fromPokemonApiResponse);
  }

  private async getPokemon(offset: number) {
    const response = await fetch(
      `${PokemonService.CONFIG.apiUrl}/pokemon/?offset=${offset}&limit=1`,
    );
    const paginateData =
      (await response.json()) as PokemonPaginateRequestRespone;
    const pokemonResponse = await fetch(paginateData.results[0].url);
    const pokemonData =
      (await pokemonResponse.json()) as PokemonIdRequestResponse;
    return pokemonData;
  }

  private async updateCharacterCount() {
    const response = await fetch(`${PokemonService.CONFIG.apiUrl}/pokemon/`);
    const data = (await response.json()) as { count: number };
    this._characterCount = data.count;
  }
}
