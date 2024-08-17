import { Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import {
  Player,
  UnitOfMeasure,
  isUnitsOfMeasure,
} from 'backend/src/models/commonModel';
import { RoleIcon } from './RoleIcon';
type PlayerCardProps = {
  player: Player;
  reverse?: boolean;
};

export function PlayerCard({ player, reverse }: PlayerCardProps): JSX.Element {
  return (
    <Card sx={{ width: '100%', height: '100px', backgroundColor: 'grey.900' }}>
      <CardContent>
        <Stack
          direction={reverse ? 'row-reverse' : 'row'}
          spacing={2}
          alignItems={'center'}
          justifyContent={'space-between'}
          textOverflow={'ellipsis'}
          overflow="hidden"
          whiteSpace={'nowrap'}
        >
          <Stack
            gap={1}
            textOverflow={'ellipsis'}
            overflow="hidden"
            whiteSpace={'nowrap'}
          >
            <Typography variant="h5" textAlign={reverse ? 'end' : 'start'}>
              {player.name}
            </Typography>
            <Stack direction={reverse ? 'row-reverse' : 'row'} gap={1}>
              {Object.entries(player).map(
                ([key, value]: [string, UnitOfMeasure | string]) => {
                  if (!isUnitsOfMeasure(value)) {
                    return null;
                  }
                  return (
                    <Chip
                      size="small"
                      key={key}
                      label={`${value.value} ${value.unit}`}
                      variant="outlined"
                      color="primary"
                    />
                  );
                },
              )}
            </Stack>
          </Stack>
          <RoleIcon role={player.role!} />
        </Stack>
      </CardContent>
    </Card>
  );
}
