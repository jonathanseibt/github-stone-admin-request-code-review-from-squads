This is a utility for the tribe I work for, Stone Admin, at my current job at [Stone Co (NASDAQ:STNE)](https://stone.co). It's a script that adds new custom buttons to GitHub to be able to automatically request code review from everyone in each of the Stone Admin squads when opening pull requests. It was built to work with the popular [Tampermonkey](https://tampermonkey.net) browser extension and is automatically published to a [GitHub Gist](https://gist.githubusercontent.com/jonathanseibt/8c233a74ac06d1980aadaea5e46833eb/raw) as Tampermonkey automatically installs and updates scripts through gists.

<div align="center">

| Screenshot                                                                                                                                              |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![screenshot](https://github.com/jonathanseibt/github-stone-admin-request-code-review-from-squads/assets/56838120/4aee43d2-a95a-46bd-8db6-853b87857768) |

</div>

## Tools

- [Conventional Commits](https://conventionalcommits.org)
- [pnpm](https://pnpm.io)
- [esbuild](https://esbuild.github.io)
- [TypeScript](https://typescriptlang.org)
- [ESLint](https://eslint.org)
- [Prettier](https://prettier.io)
- [Husky](https://typicode.github.io/husky)
- [GitHub Actions](https://github.com/features/actions)

## Using

It was built to work with the popular [Tampermonkey](https://tampermonkey.net) browser extension. You can follow [its documentation](https://tampermonkey.net/faq.php?locale=en#Q102) and install the latest script version with the GitHub Gist link where its published: https://gist.githubusercontent.com/jonathanseibt/8c233a74ac06d1980aadaea5e46833eb/raw. The gist is automatically updated with the latest versions, and Tampermonkey will automatically receive updates.

## Building yourself

### 1. Setup

Install [pnpm](https://pnpm.io) (version `^8`).

> _It's not necessary to manually install Node.js, since pnpm itself manages the required version._

### 2. Clone

`git clone https://github.com/jonathanseibt/github-stone-admin-request-code-review-from-squads.git`

### 3. Install

`pnpm i`

> _At this step, pnpm will install and self-manage the required Node.js version (`18.16.0`)._

### 4. Build

`pnpm build`

### 5. Run

It was built to work with the popular [Tampermonkey](https://tampermonkey.net) browser extension. You can follow [its documentation](https://tampermonkey.net/faq.php?locale=en#Q102) and manually create a new script using the just built `build/github-stone-admin-request-code-review-from-squads.js` file.

**Remember: if you want to use this repository latest version and not your own fork, see the [# Using](#using) section.**

<hr />

Done! 👏
