import { StarwarsPeopleResponse } from '../services/starwarsService';
import { Player } from './commonModel';
export class StarwarsCharacter extends Player {
  constructor(name: string, weight: number, height: number) {
    super(name, weight, height);
  }

  static fromStarwarsApiResponse(
    starwarsApiResponse: StarwarsPeopleResponse,
  ): StarwarsCharacter {
    return new StarwarsCharacter(
      starwarsApiResponse.name,
      Number(starwarsApiResponse.mass),
      Number(starwarsApiResponse.height),
    );
  }
}
