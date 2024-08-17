import { Container, Typography } from '@mui/material';

export function LandingPage(): JSX.Element {
  return (
    <Container
      sx={{
        paddingY: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h1">Super Soccer Showdown</Typography>
    </Container>
  );
}
