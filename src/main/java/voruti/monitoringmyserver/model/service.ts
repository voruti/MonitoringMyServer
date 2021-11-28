export class Service {
  private type: string;
  private name: string;

  public constructor(type: string, name: string) {
    this.type = type;
    this.name = name;
  }

  public getType(): string {
    return this.type;
  }

  public getName(): string {
    return this.name;
  }
}
