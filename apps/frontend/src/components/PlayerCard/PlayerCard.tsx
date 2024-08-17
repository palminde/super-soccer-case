import { Player } from 'backend/src/models/commonModel';
type PlayerCardProps = {
  player: Player;
};

export function PlayerCard({}: PlayerCardProps): JSX.Element {
  return <p>PlayerCard</p>;
}
