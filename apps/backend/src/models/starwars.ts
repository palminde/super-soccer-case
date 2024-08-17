import { Player } from './commonModel';
export class StarwarsCharacter extends Player {
  constructor(name: string, weight: number, height: number) {
    super(name, weight, height);
  }
}
