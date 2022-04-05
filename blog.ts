import * as Earthstar from "https://deno.land/x/earthstar@8.2.4/mod.ts";
import { serve } from "https://deno.land/std@0.133.0/http/mod.ts";

// =========================================================================

// Setting up a Sqlite replica
const MY_SHARE = "+gwilzone.q7uhabux";

// 2. Let's make a Sqlite replica driver.
const driver = new Earthstar.ReplicaDriverSqlite({
  filename: "share.db",
  mode: "create-or-open",
  share: MY_SHARE,
});

// 3. Let's use that to build our replica! Again!
const replica = new Earthstar.Replica(
  MY_SHARE,
  Earthstar.FormatValidatorEs4,
  driver,
);

// =========================================================================

// Let's build a blog.

// 1. This function will handle every request to our server.
async function handler(req: Request) {
  const url = new URL(req.url);

  const document = await replica.getLatestDocAtPath(url.pathname);

  if (!document) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(document.content);
}

console.log("Running server on http://localhost:8080");
await serve(handler, { port: 8080 });
