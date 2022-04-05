# Deno + Nova

The last few days I've been putting together a [Deno](https://deno.land) extension for Panic's [Nova](https://nova.app) editor. [v0.1 is now available for download](https://extensions.panic.com/extensions/co.gwil/co.gwil.deno/).

## Motivation

Deno is exciting. I love being able to start writing and running code with only a single .ts file — no tsconfig.json, no package.json, no node_modules. I like having access to basics like linting and testing without having to install and configure any new tools. The re-use of Web APIs is just great. <mark>It is going to make writing JS far more accessible for a lot more people</mark>, and for that reason I am very bullish about making [Earthstar](https://github.com/earthstar-project/earthstar) compatible with it so that I can write scripts, little servers, and tiny CLI tools with it.

I also like using Nova! It's a native Mac app, with all that entails. I'm not going to try and persuade you, you either get this value proposition or you don't.

But until now Nova did not have any kind of Deno integration available. I put myself in this kind of silly position where I was resisting actually _using_ Deno because I could not bring myself to use another IDE. Eventually I got tired of waiting. It also seemed like a great opportunity to use Deno to build a Deno extension.

I don't really know anything about [LSP](https://microsoft.github.io/language-server-protocol/), and even after building this extension my knowledge is quite superficial. I'd also never built a Nova extension. Combining that with my inexperience with Deno, I'd say I am uniquely unqualified to make this extension!

## Keeping a work diary

Knowing how little I knew, I figured I'd start keeping a work diary: one part things I'd done that day, and the other part notes to help me pick up where I left off.

The first bit — the things I'd done, decisions I'd made that day — I picked up off a short documentary titled [How the Game Boy ᵃˡᵐᵒˢᵗ ruined Nintendo](https://youtu.be/9Ki-kH751_8?t=809). Yoshihiro Taki, a Nintendo engineer, kept a professional diary in which he detailed a bit of a coup that Sharp pulled off in order to become the supplier of the Game Boy's screen. I saw those dog-eared pages and thought: I want that!

The second bit — picking up where I left off — was inspired by [How I End My Incomplete Coding Sessions](https://ryanflorence.dev/p/how-i-end-my-incomplete-coding-sessions) by Ryan Florence, whom I am a big fan of (this blog, served by Remix!). My notes are nowhere near as good as his.

The notes I kept can be found [here](https://github.com/sgwilym/nova-deno/blob/main/NOTES.md), and are in reverse chronological order. You can really see how on the first day I was just at that stage of 'what even _is_ an extension???'. I'm going to try and keep this habit.

## Standing on the shoulders of other people

The great thing about this project is how much of the hard work had been done for me:

- Deno has a built-in LSP via `deno lsp`
- Nova has a built-in `LanguageClient` class that hooks Nova's UI up to whatever LSP you hand to it.
- There is an excellent [Typescript extension](https://github.com/apexskier/nova-typescript) which I constantly referred to.

It can't be emphasised enough how wonderful it was to have a codebase like nova-typescript to refer to. It not only helped me understand what Nova expects from a dependency, but also served as an invaluable guide for a good way to structure such a project. It _also_ has a lot of generic Nova / LSP code which I more or less _copied wholesale_ into my own with only minor modifications (and which would be great to pull out into a new common dependency).

After just a few hour's work, I had hooked up Nova and Deno. I'd never been so pleased to see numerous linting and typechecking errors lighting up.

And it feels _fast_. <mark>Using Deno's Rust-powered tooling feels sturdy in a way that seems to fulfil the promise of using a native Mac editor.</mark> Format-on-save in particular feels very snappy in comparison to other extensions. 

## Lack of agency, lightness of responsibility

After the initial burst of easy wins I started running into problems. Why don't code actions work? Why can't I follow references to third party modules? Why is the console logging errors nearly every time I press a key? I spent quite a bit of time looking at input and output logs, trying to figure out what I'd done wrong.

Then I started to realise Nova's `LanguageClient` simply didn't support a lot of the responses Deno's LSP was giving back. This is understandable in the case of weird things a LSP might do (like Deno LSP's virtual `deno:/` documents), but there are a few base-level spec things it seems to have trouble with, hence normal stuff like code actions not working.

I really get it. LSP is a huge and fast-moving spec, and Panic only seems to have a handful of people on Nova. But I was left feeling a bit deflated by this: with no way to override many of LanguageClient's methods, the only thing I could do is lobby Panic for changes via their developer forum. And those forums aren't exactly jumping.

As someone who has great difficulty sharing any kind of unfinished work, this was hard a hard pill to swallow. Ship an extension with known bugs? Gross! Next thing you know you're not even bothering to design a cartoon mascot for your new JS library.

But then again, <mark>if it's out of my hands, why worry? If I ship something a little half-baked — but best-effort — what then?</mark>

Another reflection of this was shipping the extension despite the fact the codebase contains a number of type errors. By building the project with [esbuild](https://esbuild.github.io) — which does not care about type errors — I was able to keep iterating even when big red type-checking errors appeared (and make builds super fast).

Sure, I could make a pull request to the typings which are really meant to be used in Node projects. But I don't want to have to perfect an ecosystem before I can add something of my own to it.

So I resolved to ship this somewhat broken extension, care-free. It felt like another blow against an internal judge I've been working to pry myself from for many years now.

Most importantly, I can finally satisfy my editor snobbery and get on with using Deno.
