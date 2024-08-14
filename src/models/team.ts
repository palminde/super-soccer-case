import { Player, Role } from './commonModel';
import { sortPlayersByRoleFit } from '../utils/sortPlayers';

type TeamConfig = {
  numberOfDefencePlayers: number;
  numberOfOffencePlayers: number;
  optimizeFor: Extract<Role, Role.Defence | Role.Offence>; // Decides whether to assign defence or offence players first
};

type PositionAssignment = {
  defencePlayers: Player[];
  offencePlayers: Player[];
  goalie: Player;
};

const DEFAULT_TEAM_CONFIG: TeamConfig = {
  numberOfDefencePlayers: 2,
  numberOfOffencePlayers: 2,
  optimizeFor: Role.Defence,
};

const TEAM_SIZE = 5;

export class Team {
  private _id: string;
  private _goalie: Player;
  private _defencePlayers: Player[];
  private _offencePlayers: Player[];
  constructor(players: Player[], teamConfig: TeamConfig = DEFAULT_TEAM_CONFIG) {
    if (players.length !== TEAM_SIZE) {
      throw new Error('Invalid team size, must be 5 players');
    }

    const numberOfConfiguredPlayers =
      teamConfig.numberOfDefencePlayers + teamConfig.numberOfOffencePlayers;
    if (
      numberOfConfiguredPlayers >= TEAM_SIZE ||
      numberOfConfiguredPlayers === 0
    ) {
      throw new Error(
        'Invalid team configuration, must have at least 1 player configurered for either defence or offence and max 4',
      );
    }

    this._id = crypto.randomUUID();
    const positionAssignments = this.assignPositions(teamConfig, players);
    this._goalie = positionAssignments.goalie;
    this._defencePlayers = positionAssignments.defencePlayers;
    this._offencePlayers = positionAssignments.offencePlayers;
  }

  private assignPositions(
    teamConfig: TeamConfig,
    players: Player[],
  ): PositionAssignment {
    const playersToAssign = [...players];

    const goalie = sortPlayersByRoleFit(playersToAssign, Role.Goalie).shift();
    if (!goalie) {
      throw new Error('No goalie found');
    }

    sortPlayersByRoleFit(playersToAssign, teamConfig.optimizeFor);
    const defencePlayers: Player[] = [];
    for (let i = 0; i < teamConfig.numberOfDefencePlayers; i++) {
      if (teamConfig.optimizeFor === Role.Defence) {
        const playerFromStart = playersToAssign.shift();
        if (!playerFromStart) {
          throw new Error('No players left to assign');
        }
        defencePlayers.push(playerFromStart);
      } else {
        const playerFromEnd = playersToAssign.pop();
        if (!playerFromEnd) {
          throw new Error('No players left to assign');
        }
        defencePlayers.push(playerFromEnd);
      }
    }
    const offencePlayers = playersToAssign;

    return { defencePlayers, offencePlayers, goalie };
  }

  get id() {
    return this._id;
  }
  get players() {
    return [this._goalie, ...this._defencePlayers, ...this._offencePlayers];
  }
  get goalie() {
    return this._goalie;
  }

  get defencePlayers() {
    return this._defencePlayers;
  }

  get offencePlayers() {
    return this._offencePlayers;
  }
}
