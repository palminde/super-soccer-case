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
    const aValue = a[sortOn].value ?? 0;
    const bValue = b[sortOn].value ?? 0;
    if (sortOrder === 'asc') {
      return aValue - bValue;
    } else {
      return bValue - aValue;
    }
  });
};
