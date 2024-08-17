import { StarwarsCharacter } from '../models/starwars';
import { StarwarsPeopleResponse } from '../services/starwarsService';

export const mapStarwarsResponseToStarwarsCharacter = (
  starwarsResponse: StarwarsPeopleResponse,
): StarwarsCharacter => {
  return new StarwarsCharacter(
    starwarsResponse.name,
    Number(starwarsResponse.mass),
    Number(starwarsResponse.height),
  );
};
