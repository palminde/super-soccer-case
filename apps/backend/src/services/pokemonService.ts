import { mapPokemonResponseToPokemon } from '../mappers/pokemonMapper';
import { Pokemon } from '../models/pokemon';
import { randomSampleFromArray } from '../utils/randomSampleFromArray';
import { ApiConfig } from './commonService';

export type PokemonResponse = {
  name: string;
  height: string;
  weight: string;
};

export class PokemonService {
  private static CONFIG: ApiConfig = {
    apiUrl: 'https://swapi.dev/api',
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
    const pokemonIds = [...Array(this._characterCount).keys()];
    const randomPokemonIds = randomSampleFromArray(
      pokemonIds,
      numberOfPokemons,
    );

    const pokemons = await Promise.all(randomPokemonIds.map(this.getPokemon));

    return pokemons.map(mapPokemonResponseToPokemon);
  }

  private async getPokemon(id: number) {
    const response = await fetch(
      `${PokemonService.CONFIG.apiUrl}/people/${id}/`,
    );
    const data = (await response.json()) as PokemonResponse;
    return data;
  }

  private async updateCharacterCount() {
    const response = await fetch(`${PokemonService.CONFIG.apiUrl}/people/`);
    const data = (await response.json()) as { count: number };
    this._characterCount = data.count;
  }
}
