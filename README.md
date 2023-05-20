> using _conventional commits_: _[www.conventionalcommits.org](https://www.conventionalcommits.org/)_

This's a utility for the tribe I work for at my current job at Stone Co (NASDAQ:STNE). It's a script that adds new custom buttons to GitHub to automatically request code review from everyone in each
of the Stone Admin squads when opening pull requests. It was built to work with the [Tampermonkey](https://www.tampermonkey.net/) browser extension and is automatically published to a
[GitHub Gist](https://gist.githubusercontent.com/jonathanseibt/8c233a74ac06d1980aadaea5e46833eb/raw) as Tampermonkey automatically installs and updates scripts through them.

- [pnpm](https://pnpm.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [GitHub Actions](https://github.com/features/actions/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Husky](https://typicode.github.io/husky/)

## Instructions

### 1. Setup

- Install [Git](https://git-scm.com/)
- Install [Node.js](https://nodejs.org/) (version `^18.16.0`)
- Install [pnpm](https://pnpm.io/) (version `^8.5.1`)
- Install [Visual Studio Code](https://code.visualstudio.com/)
  - Install the following extensions:
    - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
    - [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode/)

### 2. Clone

`git clone https://github.com/jonathanseibt/github-stone-admin-request-code-review-from-squads.git`

### 3. Install

`pnpm i`

### 4. Build

`pnpm build`

### 5. Run

Use it with the [Tampermonkey](https://www.tampermonkey.net/) browser extension. You can set the script up manually in it, or automatically link the GitHub Gist that this repository automatically
publish updates: https://gist.githubusercontent.com/jonathanseibt/8c233a74ac06d1980aadaea5e46833eb/raw.

<hr />

Done! 👏
