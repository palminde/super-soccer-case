import { Team } from 'backend/src/models/team';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { PlayerCard } from '../PlayerCard/PlayerCard';

type TeamCardProps = {
  title: string;
  team?: Team;
  loading?: boolean;
  error?: Error;
  onGenerateNewTeam: () => void;
  reverse?: boolean;
};

export function TeamCard({
  title,
  team,
  loading,
  error,
  reverse,
  onGenerateNewTeam,
}: TeamCardProps): JSX.Element {
  return (
    <Card
      sx={{
        width: '50%',
        backgroundColor: 'black',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <CardContent>
        <Stack direction={'column'} spacing={2} alignItems={'space-between'}>
          <Typography
            variant="h5"
            textAlign={'center'}
            textOverflow={'ellipsis'}
            overflow="hidden"
            whiteSpace={'nowrap'}
          >
            {title}
          </Typography>
          {error ? (
            <p>
              An error has occured
              <br />
              {error.message}
            </p>
          ) : loading ? (
            [...Array(5).keys()].map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                sx={{ height: { xs: '200px', md: '100px' } }}
              />
            ))
          ) : (
            team?.players.map((player) => (
              <PlayerCard key={player.name} player={player} reverse={reverse} />
            ))
          )}
        </Stack>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="contained"
          onClick={() => onGenerateNewTeam()}
          fullWidth
        >
          {team?.players.length
            ? 'Generate new team'
            : `Looks like an empty team - generate: ${title}`}
        </Button>
      </CardActions>
    </Card>
  );
}
