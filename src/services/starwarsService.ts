import { StarwarsCharacter } from '../models/starwars';
import { randomSampleFromArray } from '../utils/randomSampleFromArray';
import { ApiConfig } from './commonService';

export type StarwarsPeopleResponse = {
  name: string;
  height: string;
  mass: string;
};

export class StarwarsService {
  private static CONFIG: ApiConfig = {
    apiUrl: 'https://swapi.dev/api',
  };
  private static INSTANCE: StarwarsService | undefined;
  private _characterCount: number | undefined;
  static getInstance(): StarwarsService {
    if (!this.INSTANCE) {
      this.INSTANCE = new StarwarsService();
    }
    return this.INSTANCE;
  }

  public async getRandomStarwarsCharacters(
    numberOfCharacters: number,
  ): Promise<StarwarsCharacter[]> {
    if (!this._characterCount) {
      await this.updateCharacterCount();
    }
    const characterIds = [...Array(this._characterCount).keys()];
    const randomCharacterIds = randomSampleFromArray(
      characterIds,
      numberOfCharacters,
    );

    const characters = await Promise.all(
      randomCharacterIds.map(this.getStarwarsCharacter),
    );

    return characters.map((character) => {
      return new StarwarsCharacter(
        character.name,
        Number(character.mass),
        Number(character.height),
      );
    });
  }

  private async getStarwarsCharacter(id: number) {
    const response = await fetch(
      `${StarwarsService.CONFIG.apiUrl}/people/${id}/`,
    );
    const data = (await response.json()) as StarwarsPeopleResponse;
    return data;
  }

  private async updateCharacterCount() {
    const response = await fetch(`${StarwarsService.CONFIG.apiUrl}/people/`);
    const data = (await response.json()) as { count: number };
    this._characterCount = data.count;
  }
}
