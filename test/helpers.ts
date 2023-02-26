import got from "got";
import kleur from "kleur";
import debug from "debug";

export const appDomain = "http://localhost:3000";
export const prefixUrl = process.env.API_URL || appDomain;

export function client() {
  const headers = {};

  const client = got.extend({
    prefixUrl,
    // Don't retry since test requests should always succeed the first time (if we expect them to).
    retry: { limit: 0 },
    headers,
    hooks: {
      beforeRequest: [
        (options) => {
          debug("Requesting %s %s", options.method, options.url);
        },
      ],
      beforeError: [
        (error) => {
          const { code } = error;
          if (code === "ECONNREFUSED") {
            console.error(
              kleur.bgRed(
                "Connection refused. If the API is not running, please start it in a separate process."
              )
            );
          }
          return error;
        },
      ],
      afterResponse: [
        (response) => {
          debug(
            "Request for %s had status %d",
            response.url,
            response.statusCode
          );
          return response;
        },
      ],
    },
  });

  return client;
}
