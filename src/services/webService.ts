import { Service } from "./service.js";
import { Response } from "node-fetch";
import fetch from "node-fetch";

/**
 * Tests if an URL is available and (optional) if parts of HTML code are found on it.
 */
export class WebService extends Service {
  private url: string;
  private parts: string[];
  private additionalCheck: ((response: Response) => boolean) | undefined;

  public constructor(
    name: string | undefined,
    url: string,
    parts: string[] = [],
    additionalCheck?: (response: Response) => boolean
  ) {
    super(name);

    this.url = url;
    this.parts = parts;
    this.additionalCheck = additionalCheck;
  }

  public check(): Promise<boolean> {
    return (
      fetch(this.url)
        // .then((response) => {
        //   console.log(response);
        //   return response;
        // })
        .then(async (response) => {
          let isOk = Boolean(response) && Boolean(response.ok);
          // early return 1:
          if (!isOk || (this.parts.length === 0 && !this.additionalCheck)) {
            return isOk;
          }

          const text = (await response.text()).substring(0, 10000);
          // console.log(text.replace(RegExp("[^\\s\\x20-\\x7E]", "g"), ""));
          isOk = this.parts.map((part) => text.includes(part)).every(Boolean);
          // early return 1:
          if (!isOk || !this.additionalCheck) {
            return isOk;
          }

          return this.additionalCheck(response);
        })
        .catch((reason) => {
          console.log(this.name, "produced error", reason);
          return false;
        })
    );
  }
}
