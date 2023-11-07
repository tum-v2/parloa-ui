## About The Project

This project was built using [next.js 13](https://nextjs.org/).

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Getting Started

### Node Modules

After cloning the repository, go to the root directory and run:

```bash
npm install
```

This will install all the dependencies listed in package.json.

### Running the server

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can also build the application and compile the typescript code without starting the development server, just run:

```bash
npm run build
```

This will build the current code. You can then see the changes you made by either running

```bash
npm run start
#or
npm run dev
```

### Formatting

The project uses ESLint and prettier to lint and format code.

Please note that whenever you push some changes to a branch, ESLint and prettier will run automatically, via Github
Actions.

#### ESLint

- To change the ESLing configuration, see [here](https://eslint.org/docs/latest/use/configure/).
- To learn more about Next.js and ESLint integration, as well as the rules and formats we are currently using,
  see [here](https://nextjs.org/docs/pages/building-your-application/configuring/eslint).

You can run ESLint manually by running:

```bash
npm run lint
```

You can also integrate ESLint with your IDE:

- For WebStorm, follow the
  instructions [here](https://www.jetbrains.com/help/webstorm/eslint.html#ws_js_eslint_automatic_configuration).
- For VSCode, follow the instructions [here](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  .

#### prettier

There is already a `.prettierrc` file available in the repository, you can change the prettier configuration from
there.

prettier can also be integrated with your IDE:

- For Webstorm, follow the instructions [here](https://prettier.io/docs/en/webstorm).
- For VSCode, follow the instructions [here](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  .

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and
load Inter, a custom Google Font.

#### Husky & lint-staged

Husky is a tool to enable hooks for projects.

Husky will run a `pre-commit` hook that calls `ESLint` and `prettier` before every commit. If it encounters errors or
warnings, the commit will fail.

If you encounter a warning that is inconsequential or simply a bug that does not affect the production code, you can
disable the `pre-commit` hook by running:

```Bash
git commit --no-verify
# and
git push --no-verify
```

The `--no-verify` flag should disable Husky. Please use this only carefully and only on warnings that does not make
sense.

### Branch Structure

- Please **don't** merge your branches directly with the `main` branch. There is a `development` branch which you can merge your branches.
- The new branch should be branched off of the `development` branch
- This will allow for a stable `main` branch in case anything goes wrong with the integration.
- Development can be merged to main when everybody gives the green light, possible at the end of every sprint.

## Documentation & Comments

In order to write consistent doc comments, we will use [TSDoc](https://tsdoc.org/).

We are using `eslint-plugin-tsdoc` to integrate TSDoc with ESLint. This way, ESLint will issue a warning when the doc
comments are not in TSDoc standards.

To learn more about `eslint-plugin-tsdoc`, check [here](https://www.npmjs.com/package/eslint-plugin-tsdoc).

## Good Practices

### Branches

Use Linear’s branch name feature!

- Go to your task’s detail page.
- Click on the branch icon at the top right of the page to copy the branch’s name.
- Use that name to create a new branch in your local git repository.

### Commits

**Descriptive Commit Messages**: Please provide short but descriptive commit messages for other developers to understand.

### Pull Requests

**Describe your PR with as much detail as possible**

- What changes have you made? (Why?)
- Specify any important decisions you made that involve other teams
- Add screenshots to visualize your changes
