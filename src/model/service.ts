export abstract class Service {
  private name: string;

  public constructor(name?: string) {
    if (name) {
      this.name = name;
    } else {
      this.name = `${this.constructor.name}_${Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase()}`;
    }
  }

  public abstract check(): Promise<boolean>;

  public getName(): string {
    return this.name;
  }
}
