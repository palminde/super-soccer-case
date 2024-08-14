import { Player } from './commonModel';
export class Pokemon extends Player {
  constructor(name: string, weight: number, height: number) {
    super(name, weight, height);
  }
}
