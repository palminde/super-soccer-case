import { Button, Container, Stack, Typography } from '@mui/material';
import { Team } from 'backend';
import { TeamCard } from 'src/components/TeamCard/TeamCard';
import { useGetData } from 'src/hooks/useGetData/useGetData';
import { teamEndPoints } from 'src/hooks/useGetData/useGetData.config';

export function LandingPage(): JSX.Element {
  const {
    data: starwarsData,
    loading: starwarsLoading,
    error: starwarsError,
    getData: getStarwarsData,
  } = useGetData<Team>({
    endpoint: teamEndPoints.starwars,
    lazy: true,
  });
  const {
    data: pokemonData,
    loading: pokemonLoading,
    error: pokemonError,
    getData: getPokemonData,
  } = useGetData<Team>({
    endpoint: teamEndPoints.pokemon,
    lazy: true,
  });

  return (
    <Container
      maxWidth="xl"
      sx={{
        paddingY: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Typography textAlign={'center'} variant={'h1'}>
        Super Soccer Showdown
      </Typography>
      <Stack
        direction={'row'}
        spacing={2}
        width={'100%'}
        justifyContent={'space-between'}
      >
        <TeamCard
          title={'Team Star Wars'}
          onGenerateNewTeam={getStarwarsData}
          team={starwarsData}
          loading={starwarsLoading}
          error={starwarsError}
        />
        <TeamCard
          title={'Team Pokemon'}
          onGenerateNewTeam={getPokemonData}
          team={pokemonData}
          loading={pokemonLoading}
          error={pokemonError}
          reverse
        />
      </Stack>
      <Typography textAlign={'center'} variant={'h3'}>
        OR
      </Typography>
      <Button variant="contained">
        <Typography
          variant={'h4'}
          onClick={() => {
            getStarwarsData();
            getPokemonData();
          }}
        >
          Generate Both
        </Typography>
      </Button>
    </Container>
  );
}
