This is a utility for the tribe I work for, Stone Admin, at my current job at [Stone Co (NASDAQ:STNE)](https://stone.co). It's a script that adds new custom buttons to GitHub to be able to automatically request code review from everyone in each of the Stone Admin squads when opening pull requests. It was built to work with the popular [Tampermonkey](https://tampermonkey.net) browser extension and is automatically published to a [GitHub Gist](https://gist.githubusercontent.com/jonathanseibt/8c233a74ac06d1980aadaea5e46833eb/raw) as Tampermonkey automatically installs and updates scripts through gists.

<div align="center">

<picture>
  <img src="https://github.com/jonathanseibt/github-stone-admin-request-code-review-from-squads/assets/56838120/afff27b9-f664-4f82-817d-6462366e6d7c">
</picture>

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

Install [pnpm](https://pnpm.io) (version `^9`).

> _It's not necessary to manually install Node.js, since pnpm itself manages the required version._

### 2. Clone

`git clone https://github.com/jonathanseibt/github-stone-admin-request-code-review-from-squads.git`

### 3. Install

`pnpm i`

> _At this step, pnpm will install and self-manage the required Node.js version (`20.12.2`)._

### 4. Build

`pnpm build`

### 5. Run

It was built to work with the popular [Tampermonkey](https://tampermonkey.net) browser extension. You can follow [its documentation](https://tampermonkey.net/faq.php?locale=en#Q102) and manually create a new script using the just built `build/github-stone-admin-request-code-review-from-squads.js` file.

<hr />

Done! 👏
