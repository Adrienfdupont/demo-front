import {Distribution} from "../distribution/distribution.model";

export class Category {
  private _id: number;
  private _name: string;
  private _distributions: Distribution[] = [];

  constructor(data: any) {
    this._id = data.id ? data.id: null;
    this._name = data.name ? data.name : null;
    if (data.distributions) {
      data.distributions.forEach((distribution: Distribution) => {
        this._distributions.push(new Distribution(distribution));
      })
    }
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get distributions(): Distribution[] {
    return this._distributions;
  }

  set distributions(value: Distribution[]) {
    this._distributions = value;
  }

  serialize() {
    return {
      id: this.id,
      name: this.name,
      distributions: this.distributions,
    };
  }
}
