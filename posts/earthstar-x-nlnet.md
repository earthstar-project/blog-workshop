# Earthstar × NLnet

It's been a year and a half since I began contributing to the Earthstar project.
The project's aim is to provide a toolbox for users who want to operate their
own online utilities: their own personal file sync; a blog publishing system;
graphical chatrooms; a bespoke social network.

Earthstar sits on a relatively unexplored band of the spectrum of new web
technologies: ephemerality in place of permanence, privacy in place of
discovery, trust in place of trustlessness, small where everything else is big.

All of this gets me excited. When you're donating your spare hours to a project
that excites you, you naturally start asking yourself: how can I work on this
full-time?

NLnet Foundation has been funding projects building towards an open, fairer web
since 1997. They've funded projects like [Manyverse](http://manyver.se),
[Briar](https://briarproject.org), [MNT Reform](https://mntre.com),
[PeerTube](https://joinpeertube.org), and [Wireguard](https://www.wireguard.com)
to name just a few.

And now Earthstar can be added to that list!

<mark>This funding means I'll be able to work full-time on Earthstar for an
extended period of time</mark>.

## What will I be working on?

The planned work has been broken down into five milestones.

### Reworking

The first milestone will deliver a complete reworking of Earthstar that is
nearing completion. This new version has support for resumable synchronisation
(e.g. over intermittent connections), support for multiple JS runtimes (e.g.
browsers, Node, Deno), a synchronous cache abstraction for replicas, and a
channel-based API for subscribing to replica events. The major remaining part is
implementing synchronisation over a swappable transport (e.g. HTTP, WebSocket,
BroadcastChannel).

- Add RPC-based syncing to support protocol agnostic sync
- Add a HTTP + Server Sent Events sync implementation
- Add a WebSocket sync implementation
- Add a BroadcastChannel sync implementation
- Create a stop-gap replica server implementation so that we can deploy test
  infrastructure
- Create a stop-gap implementation of the IndexedDB replica driver to save large
  amounts of data
- Create a first edition of the website containing: an adequate landing page,
  concept glossary, core API documentation, and specification for the ES5 data
  format.

### Collaborative knowledge publishing

The second milestone focuses on delivering the benefits of the new version of
Earthstar (and its future additions within this project) via a CLI tool, as well
as a compelling use case: collaborative knowledgebase editing and publishing.
Users will be able to edit and view a knowledgebase as a simple directory of
files on their filesystem, editable with their existing tools. Using the
Earthstar CLI they will be able to sync these documents to their own pub
servers, which will be able to serve a read-only version of this knowledgebase
as a website.

- Create a Earthstar CLI for generating and managing identities, as well as
  syncing commons
- Add a method of syncing a commons to and from the filesystem
- Create a server which serves hyperlinked documents from an Earthstar commons
  via HTTP + Gemini protocol
- Add documentation for downloading and using the new CLI to the earthstar
  website
- Add documentation for creating a collaborative knowledgebase to the earthstar
  website

### Replica servers

Earthstar promotes the use of small, user-operated ‘replica servers’ for
networks to propagate their data through. In order for this to be a viable
approach, we need a replica server that is trivial to deploy and configure. We
also need ways for early adopters of this to support the general Earthstar
ecosystem.

- Create a new replica server implementation with allowlist / blocklist for
  syncable shares, data retention policies (e.g. hold trusted shares’ data
  indefinitely, hold unknown shares’ data for an hour)
- Create a new SQLite replica implementation for data persistence.
- Update the website with a tutorial for setting up a replica server, and a
  tutorial for building a simple chatroom, and API docs for the SQLite replica
  driver.

### Restricting read / write access

Obtaining a share’s public key currently grants you read/write access to its
contents. In this milestone, an optional private key required for write access
will be added. This opens the door to being able to host a share’s data without
being able to write to it. Additionally, helpers for encrypting and decrypting
the contents of a document will be added.

- Add private keys for shares, as well as a special format for private share’s
  public addresses
- Add utilities for writing and reading encrypted data to document contents (NB:
  document metadata will remain unencrypted),
- Request an external security quickscan of the new document encryption
- Update the website with the new ES6 data specification and any new APIs

### Large blob support

Finally, we want to add support for large blobs to Earthstar. This would mean
support for internally representing a document’s contents as Uint8array, and
improved methods for storing this data in different replica implementations,
especially the IndexedDB replica.

- Add blob support to documents
- Update the replica implementation to efficiently store binary data
- Create a good implementation of the IndexedDB replica
- Update the website with the new ES7 data specification and any new APIs

There's a lot to be done, and thankfully much of it is already underway. Wish me
luck! I'll be sharing monthly development updates here, on
[Earthstar's Open Collective](https://opencollective.com/earthstar), and on
Secure Scuttlebutt (`@PEqxT8YRvrkf2fyjAgTl8pmdo8aR4KVsKLyh0b5JyOE=.ed25519`)

## Thanks

This marks the end of a bumpy transition from commercial to public work for me.
I want to make this the beginning of something lasting, rather than a flash in
the pan, and I'm honoured that I can even try. What a way to end one year and
begin another.

My thanks to:

- NLnet for their support and funding
- Erick Lavoie, who proofread and offered changes to my application
- My dear wife Yuliya, who has always supported me
- And Cinnamon, who created Earthstar, proofread applications, helped me plan
  the work, and who is just a great friend and collaborator to have.
