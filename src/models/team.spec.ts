import { Pokemon } from './pokemon';
import { Team } from './team';

describe('Team', () => {
  describe('constructor', () => {
    it('should throw an error if the team size is not 5', () => {
      // Arrange
      const pokemons: Pokemon[] = [];

      // Act
      // Assert
      expect(() => new Team(pokemons)).toThrow('Invalid team size, must be 5 players');
    });
  });
});
