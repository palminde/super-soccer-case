import { Player, Role } from '../models/commonModel';

type SortKey = 'weight' | 'height';
type SortOrder = 'asc' | 'desc';

export const sortPlayersByRoleFit = (
  players: Player[],
  roleToFit: Role,
): Player[] => {
  switch (roleToFit) {
    case Role.Defence:
      return sortPlayers(players, 'weight', 'desc');
    case Role.Offence:
      return sortPlayers(players, 'height', 'asc');
    case Role.Goalie:
      return sortPlayers(players, 'height', 'desc');
  }
};

export const sortPlayers = (
  players: Player[],
  sortOn: SortKey,
  sortOrder: SortOrder,
): Player[] => {
  return players.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortOn].value - b[sortOn].value;
    } else {
      return b[sortOn].value - a[sortOn].value;
    }
  });
};
