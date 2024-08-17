import { Role } from './commonModel';
import { Pokemon } from './pokemon';
import { Team } from './team';
import { describe, expect, it } from 'vitest';

describe('Team', () => {
  describe('constructor', () => {
    describe('validate players array size', () => {
      it('should throw an error if the players input is emptty', () => {
        expect(() => new Team([])).toThrow(
          'Invalid team size, must be 5 players',
        );
      });
      it('should throw an error if the players input is less than 5', () => {
        const players = [
          new Pokemon('p1', 80, 180),
          new Pokemon('p2', 70, 170),
        ];
        expect(() => new Team(players)).toThrow(
          'Invalid team size, must be 5 players',
        );
      });
      it('should throw an error if the players input is more than 5', () => {
        const players = [
          new Pokemon('p1', 80, 180),
          new Pokemon('p2', 70, 170),
          new Pokemon('p3', 60, 160),
          new Pokemon('p4', 50, 150),
          new Pokemon('p5', 40, 140),
          new Pokemon('p6', 30, 130),
        ];
        expect(() => new Team(players)).toThrow(
          'Invalid team size, must be 5 players',
        );
      });
      it('should not throw an error if the players input is exactly 5', () => {
        const players = [
          new Pokemon('p1', 80, 180),
          new Pokemon('p2', 70, 170),
          new Pokemon('p3', 60, 160),
          new Pokemon('p4', 50, 150),
          new Pokemon('p5', 40, 140),
        ];
        expect(() => new Team(players)).not.toThrow;
      });
    });
    describe('validate team configuration', () => {
      it('should throw an error if config has to many players for a position', () => {
        const players = [
          new Pokemon('p1', 80, 180),
          new Pokemon('p2', 70, 170),
          new Pokemon('p3', 80, 160),
          new Pokemon('p4', 50, 150),
          new Pokemon('p5', 40, 140),
        ];
        expect(
          () =>
            new Team(players, {
              numberOfDefencePlayers: 3,
              numberOfOffencePlayers: 3,
              optimizeFor: Role.Defence,
            }),
        ).toThrow();
        expect(
          () =>
            new Team(players, {
              numberOfDefencePlayers: 5,
              numberOfOffencePlayers: 0,
              optimizeFor: Role.Offence,
            }),
        ).toThrow();
      });
      it('should throw if no players are configured for a position', () => {
        const players = [
          new Pokemon('p1', 80, 180),
          new Pokemon('p2', 70, 170),
          new Pokemon('p3', 80, 160),
          new Pokemon('p4', 50, 150),
          new Pokemon('p5', 40, 140),
        ];
        expect(
          () =>
            new Team(players, {
              numberOfDefencePlayers: 0,
              numberOfOffencePlayers: 0,
              optimizeFor: Role.Defence,
            }),
        ).toThrow();
      });
    });
    describe('assign players to positions based on config', () => {
      it('should assign players to the correct positions with default/no config', () => {
        const players = [
          new Pokemon('p1', 80, 180),
          new Pokemon('p2', 70, 170),
          new Pokemon('p3', 80, 160),
          new Pokemon('p4', 50, 150),
          new Pokemon('p5', 40, 140),
        ];
        const team = new Team(players);

        expect(team.goalie.name).toBe('p1');
        expect(team.defencePlayers.length).toBe(2);
        expect(team.offencePlayers.length).toBe(2);
        expect(team.defencePlayers[0].name).toBe('p3');
        expect(team.defencePlayers[1].name).toBe('p2');
        expect(team.offencePlayers[0].name).toBe('p4');
        expect(team.offencePlayers[1].name).toBe('p5');
      });
      it('should assign all to offence if config is set to all offence', () => {
        const players = [
          new Pokemon('p1', 80, 180),
          new Pokemon('p2', 70, 170),
          new Pokemon('p3', 80, 160),
          new Pokemon('p4', 50, 150),
          new Pokemon('p5', 40, 140),
        ];
        const team = new Team(players, {
          numberOfDefencePlayers: 0,
          numberOfOffencePlayers: 4,
          optimizeFor: Role.Defence,
        });

        expect(team.goalie.name).toBe('p1');
        expect(team.defencePlayers.length).toBe(0);
        expect(team.offencePlayers.length).toBe(4);
      });
      it('should assign defence players first if config is set to optimize for defence', () => {
        const players = [
          new Pokemon('p1', 80, 180),
          new Pokemon('p2', 70, 170),
          new Pokemon('p3', 80, 160),
          new Pokemon('p4', 90, 150),
          new Pokemon('p5', 40, 140),
        ];
        const team = new Team(players, {
          numberOfDefencePlayers: 2,
          numberOfOffencePlayers: 2,
          optimizeFor: Role.Defence,
        });

        expect(team.goalie.name).toBe('p1');
        expect(team.defencePlayers.length).toBe(2);
        expect(team.offencePlayers.length).toBe(2);
        expect(team.defencePlayers[0].name).toBe('p4'); // p4 is the heaviest and therefore is set to defence altough height is lower than p2
        expect(team.defencePlayers[1].name).toBe('p3');
      });
    });
  });
});
