import { Team } from '../../models/team';
import { PokemonService } from '../../services/pokemonService';
import { StarwarsService } from '../../services/starwarsService';

export const getPokemonTeam = async () => {
  const pokemonService = PokemonService.getInstance();
  const pokemonPlayers = await pokemonService.getRandomPokemons(5);
  return new Team(pokemonPlayers);
};

export const getStarWarsTeam = async () => {
  const starwarsService = StarwarsService.getInstance();
  const starwarsPlayers = await starwarsService.getRandomStarwarsCharacters(5);
  return new Team(starwarsPlayers);
};
