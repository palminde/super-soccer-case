import express from 'express';
import cors from 'cors';
import { getPokemonTeam, getStarWarsTeam } from './api/v1/handler';
import { localServerConfig } from './config';

const app = express();
app.use(cors());
app.get(`${localServerConfig.path}/team/pokemon`, async (_req, res) => {
  const team = await getPokemonTeam();
  res.send(team.toJSON());
});

app.get(`${localServerConfig.path}/team/starwars`, async (_req, res) => {
  const team = await getStarWarsTeam();

  res.send(team.toJSON());
});

app.listen(localServerConfig.port, localServerConfig.host, () => {
  console.log();
});
