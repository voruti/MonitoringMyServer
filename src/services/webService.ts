import { Service } from "./service.js";
import fetch from "node-fetch";

/**
 * Tests if an URL is available and (optional) if parts of HTML code are found on it.
 */
export class WebService extends Service {
  private url: string;
  private parts: string[];

  public constructor(
    name: string | undefined,
    url: string,
    parts: string[] = []
  ) {
    super(name);

    this.url = url;
    this.parts = parts;
  }

  public check(): Promise<boolean> {
    return (
      fetch(this.url)
        // .then(async (response) => {
        //   console.log(response);
        //   console.log(await response.text());
        //   return response;
        // })
        .then(async (response) => {
          const isOk = Boolean(response) && Boolean(response.ok);
          if (!isOk) {
            return false;
          }

          const text = await response.text();
          return this.parts.map((part) => text.includes(part)).every(Boolean);
        })
        .catch((reason) => {
          console.log(this.name, "produced error", reason);
          return false;
        })
    );
  }
}
