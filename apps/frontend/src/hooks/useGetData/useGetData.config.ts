import { localServerConfig } from 'backend';

export const teamEndPoints = {
  pokemon: `http://${localServerConfig.host}:${localServerConfig.port}${localServerConfig.path}/team/pokemon`,
  starwars: `http://${localServerConfig.host}:${localServerConfig.port}${localServerConfig.path}/team/starwars`,
};
