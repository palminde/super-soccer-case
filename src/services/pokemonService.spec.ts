import { PokemonService } from './pokemonService';

describe('PokemonService', () => {
  it('should return a list of random pokemons', async () => {
    const service = PokemonService.getInstance();
    const pokemons = await service.getRandomPokemons(5);
    expect(pokemons.length).toBe(5);
  }, 10000);
});
