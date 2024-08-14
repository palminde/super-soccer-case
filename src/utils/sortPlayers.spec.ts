import { Role } from '../models/commonModel';
import { Pokemon } from '../models/pokemon';
import { sortPlayers, sortPlayersByRoleFit } from './sortPlayers';

describe('sortPlayers', () => {
  it('should sort players by weight in ascending order', () => {
    // Arrange
    const heavyPokemon = new Pokemon('heavy', 80, 180);
    const lightPokemon = new Pokemon('light', 70, 170);
    const players = [heavyPokemon, lightPokemon];
    // Act
    sortPlayers(players, 'weight', 'asc');
    // Assert
    expect(players[0]).toEqual(lightPokemon);
    expect(players[1]).toEqual(heavyPokemon);
  });
  it('should sort players by weight in descending order', () => {
    // Arrange
    const heavyPokemon = new Pokemon('heavy', 80, 180);
    const lightPokemon = new Pokemon('light', 70, 170);
    const players = [heavyPokemon, lightPokemon];
    // Act
    sortPlayers(players, 'weight', 'desc');
    // Assert
    expect(players[0]).toEqual(heavyPokemon);
    expect(players[1]).toEqual(lightPokemon);
  });
  it('should sort players by height in ascending order', () => {
    // Arrange
    const tallPokemon = new Pokemon('tall', 80, 180);
    const shortPokemon = new Pokemon('short', 70, 170);
    const players = [tallPokemon, shortPokemon];
    // Act
    sortPlayers(players, 'height', 'asc');
    // Assert
    expect(players[0]).toEqual(shortPokemon);
    expect(players[1]).toEqual(tallPokemon);
  });
  it('should sort players by height in descending order', () => {
    // Arrange
    const tallPokemon = new Pokemon('tall', 80, 180);
    const shortPokemon = new Pokemon('short', 70, 170);
    const players = [tallPokemon, shortPokemon];
    // Act
    sortPlayers(players, 'height', 'desc');
    // Assert
    expect(players[0]).toEqual(tallPokemon);
    expect(players[1]).toEqual(shortPokemon);
  });
});

describe('sortPlayersByRoleFit', () => {
  it('should sort players by weight in descending order for defence role', () => {
    // Arrange
    const heavyPokemon = new Pokemon('heavy', 80, 180);
    const lightPokemon = new Pokemon('light', 70, 170);
    const players = [heavyPokemon, lightPokemon];
    // Act
    sortPlayersByRoleFit(players, Role.Defence);
    // Assert
    expect(players[0]).toEqual(heavyPokemon);
    expect(players[1]).toEqual(lightPokemon);
  });
  it('should sort players by height in ascending order for offence role', () => {
    // Arrange
    const tallPokemon = new Pokemon('tall', 80, 180);
    const shortPokemon = new Pokemon('short', 70, 170);
    const players = [tallPokemon, shortPokemon];
    // Act
    sortPlayersByRoleFit(players, Role.Offence);
    // Assert
    expect(players[0]).toEqual(shortPokemon);
    expect(players[1]).toEqual(tallPokemon);
  });
  it('should sort players by height in descending order for goalie role', () => {
    // Arrange
    const tallPokemon = new Pokemon('tall', 80, 180);
    const shortPokemon = new Pokemon('short', 70, 170);
    const players = [tallPokemon, shortPokemon];
    // Act
    sortPlayersByRoleFit(players, Role.Goalie);
    // Assert
    expect(players[0]).toEqual(tallPokemon);
    expect(players[1]).toEqual(shortPokemon);
  });
});
