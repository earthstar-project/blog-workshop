import * as Earthstar from "https://deno.land/x/earthstar@8.2.4/mod.ts";
import { join } from "https://deno.land/std@0.133.0/path/mod.ts";

// Import the identity we made!
import keypair from "./identity.json" assert { type: "json" };

// =========================================================================

// Setting up a Replica

// 1. Come up with a cool share name.
const MY_SHARE = "+gwilzone.q7uhabux";

// 2. Let's make an in-memory replica driver.
const driver = new Earthstar.ReplicaDriverMemory(MY_SHARE);

// 3. Let's use that to build our replica!
const replica = new Earthstar.Replica(
  MY_SHARE,
  Earthstar.FormatValidatorEs4,
  driver,
);

// =========================================================================

// Writing our blog posts into the replica.

// 1. Keep the path to our paths post in a handy variable.
const POSTS_PATH = "./posts";

// 2. Iterate over the contents of the posts directory.
for await (const entry of Deno.readDir(POSTS_PATH)) {
  const filePath = join(POSTS_PATH, entry.name);

  // 3. Read the contents of our file.
  const fileContents = await Deno.readTextFile(filePath);

  // 4. Write them into our replica!
  await replica.set(keypair, {
    path: `/posts/${entry.name}`,
    content: fileContents,
    format: "es.4",
  });
}

// =========================================================================

// Let's sync!

// 1. Make a peer.
const peer = new Earthstar.Peer();

// 2. Add the replica.
peer.addReplica(replica);

// 3. Sync with the URL. Use ws! Don't forget pathname!
peer.sync("ws://localhost:8080/earthstar-api/v2");

console.log("Syncing with ws://localhost:8080/earthstar-api/v2");
