export class Distribution {
  private _id: number;
  private _name: string;
  private _description: string;
  private _categoryId: number;

  constructor(data: any) {
    this._id = data.id ? data.id : null;
    this._name = data.name ? data.name : null;
    this._description = data.description ? data.description : null;
    this._categoryId = data.categoryId ? data.categoryId : null;
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

  get categoryId(): number {
    return this._categoryId;
  }

  set categoryId(value: number) {
    this._categoryId = value;
  }

  serialize(){
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      categoryId: this.categoryId,
    };
  }
}
