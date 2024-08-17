export interface UnitOfMeasure {
  value?: number;
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
  private _role: Role | undefined;
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

  get role() {
    return this._role;
  }

  set role(role: Role | undefined) {
    this._role = role;
  }

  toJSON() {
    return {
      name: this._name,
      weight: this._weight,
      height: this._height,
      role: this._role,
    };
  }
}

export const isUnitsOfMeasure = (value: any): value is UnitOfMeasure => {
  return (
    typeof value === 'object' &&
    ['cm', 'kg'].includes(value.unit) &&
    typeof value.value === 'number'
  );
};
