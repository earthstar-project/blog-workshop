import * as Earthstar from "https://deno.land/x/earthstar@8.2.4/mod.ts";

const keypair = await Earthstar.Crypto.generateAuthorKeypair("blog");

if (!Earthstar.isErr(keypair)) {
  await Deno.writeTextFile("identity.json", JSON.stringify(keypair));
  console.log("Wrote your new keypair to identity.json!");
} else {
  console.error("Something went wrong:", keypair);
}
