import { Service } from "./service.js";
import { Response } from "node-fetch";
import fetch from "node-fetch";

export interface Checks {
  /**
   * Allow any HTTP status code.
   */
  allowErrorStatus?: boolean;

  /**
   * Regex parts to search for in the page.
   */
  regexParts?: string[];

  /**
   * Regex of final URL to check.
   */
  regexResultingUrl?: string;

  /**
   * Any additional checks.
   */
  additionalCheck?: (response: Response) => boolean;
}

/**
 * By default tests if an URL is available with status 200. Optional checks can be enabled.
 */
export class WebService extends Service {
  private url: string;
  private checks: Checks;

  public constructor(
    name: string | undefined,
    url: string,
    checks: Checks = {}
  ) {
    super(name);

    this.url = url;
    this.checks = checks;
  }

  public check(): Promise<boolean> {
    return (
      fetch(this.url)
        // .then((response) => {
        //   console.log(response);
        //   return response;
        // })
        .then(async (response) => {
          if (!this.checks.allowErrorStatus && !response.ok) {
            return false;
          }

          if (this.checks.regexParts && this.checks.regexParts.length > 0) {
            const text = (await response.text()).substring(0, 10000);
            // console.log(text.replace(RegExp("[^\\s\\x20-\\x7E]", "g"), ""));

            if (
              !this.checks.regexParts
                .map((part) => text.match(RegExp(part, "m")))
                .every(Boolean)
            ) {
              return false;
            }
          }

          if (
            this.checks.regexResultingUrl &&
            !response.url.match(RegExp(this.checks.regexResultingUrl, "m"))
          ) {
            return false;
          }

          if (
            this.checks.additionalCheck &&
            !this.checks.additionalCheck(response)
          ) {
            return false;
          }

          return true;
        })
        .catch((reason) => {
          console.log(this.name, "produced error", reason);
          return false;
        })
    );
  }
}
