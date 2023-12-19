export class Distribution {
  private _id: number;
  private _name: string;
  private _description: string;

  constructor(data: any) {
    this._id = data.id ? data.id : null;
    this._name = data.name ? data.name : null;
    this._description = data.description ? data.description : null;
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

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }
}
