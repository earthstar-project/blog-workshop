import * as Earthstar from "https://deno.land/x/earthstar@8.2.4/mod.ts";
import { TransportWebsocketServer } from "https://deno.land/x/earthstar_streaming_rpc/mod.ts";
import { serve } from "https://deno.land/std@0.133.0/http/mod.ts";
import { micromark } from "https://esm.sh/micromark";

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

// 4. Let's put that replica into a Peer.
const peer = new Earthstar.Peer();
peer.addReplica(replica);

// =========================================================================

// Let's build a blog.

// We need a syncer. This pulls docs from any other peers it connects to.
const syncer = new Earthstar.Syncer(peer, (methods) => {
  return new TransportWebsocketServer({
    deviceId: peer.peerId,
    methods,
    url: "/earthstar-api/v2",
  });
});

// 1. This function will handle every request to our server.
async function handler(req: Request) {
  const url = new URL(req.url);

  if (url.pathname.startsWith("/earthstar-api/v2")) {
    return syncer.transport.reqHandler(req);
  }

  const document = await replica.getLatestDocAtPath(url.pathname);

  if (!document) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(micromark(document.content), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}

console.log("Running server on http://localhost:8080");
await serve(handler, { port: 8080 });
