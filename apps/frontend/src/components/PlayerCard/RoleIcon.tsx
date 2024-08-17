import { BackHand, Shield, SportsSoccer } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import { Role } from 'backend/src/models';
import { useMemo } from 'react';

type RoleIconProps = {
  role: Role;
};

export function RoleIcon({ role }: RoleIconProps): JSX.Element {
  const RoleIcon = useMemo(() => {
    switch (role) {
      case Role.Offence:
        return <SportsSoccer />;
      case Role.Defence:
        return <Shield />;
      case Role.Goalie:
      default:
        return <BackHand />;
    }
  }, [role]);

  return <Tooltip title={`Role: ${role.toString()}`}>{RoleIcon}</Tooltip>;
}
