import { Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import {
  Player,
  UnitOfMeasure,
  isUnitsOfMeasure,
} from 'backend/dist/models/commonModel';
import { RoleIcon } from './RoleIcon';
type PlayerCardProps = {
  player: Player;
  reverse?: boolean;
};

export function PlayerCard({ player, reverse }: PlayerCardProps): JSX.Element {
  return (
    <Card
      sx={{
        width: '100%',
        height: { xs: '200px', md: '100px' },
        backgroundColor: 'grey.900',
      }}
    >
      <CardContent>
        <Stack
          direction={{ xs: 'column', md: reverse ? 'row-reverse' : 'row' }}
          spacing={2}
          alignItems={'center'}
          justifyContent={'space-between'}
          textOverflow={'ellipsis'}
          overflow={{ xs: 'visible', md: 'hidden' }}
        >
          <Stack
            gap={1}
            textOverflow={'ellipsis'}
            overflow="hidden"
            whiteSpace={'nowrap'}
          >
            <Typography
              variant={'h5'}
              whiteSpace={{ xs: 'normal', md: 'nowrap' }}
              textAlign={{ xs: 'center', md: reverse ? 'end' : 'start' }}
            >
              {player.name}
            </Typography>
            <Stack
              direction={reverse ? 'row-reverse' : 'row'}
              gap={1}
              justifyContent={{ xs: 'center', md: 'flex-start' }}
            >
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
