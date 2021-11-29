import { Service } from "./service";
import { status } from "minecraft-server-util";

export class MinecraftService extends Service {
  private host: string;
  private port: number | undefined;

  public constructor(name: string | undefined, host: string, port?: number) {
    super(name);

    this.host = host;
    this.port = port;
  }

  public check(): Promise<boolean> {
    return (
      status(this.host, this.port)
        // .then((javaStatusResponse) => {
        //   console.log(javaStatusResponse);
        //   return javaStatusResponse;
        // })
        .then(
          (javaStatusResponse) =>
            Boolean(javaStatusResponse) &&
            Boolean(javaStatusResponse.players) &&
            Boolean(javaStatusResponse.players.max) &&
            javaStatusResponse.players.max > 0
        )
    );
  }
}
