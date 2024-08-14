export interface UnitOfMeasure {
  value: number;
  unit: 'cm' | 'kg';
}

export enum Role {
  Goalie = 'Goalie',
  Defence = 'Defence',
  Offence = 'Offence',
}

export abstract class Player {
  private _name: string;
  private _weight: UnitOfMeasure;
  private _height: UnitOfMeasure;
  constructor(name: string, weight: number, height: number) {
    this._name = name;
    this._weight = { value: weight, unit: 'kg' };
    this._height = { value: height, unit: 'cm' };
  }
  get name() {
    return this._name;
  }
  get weight() {
    return this._weight;
  }
  get height() {
    return this._height;
  }
}
