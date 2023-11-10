## About The Project

This project was built using [next.js 13](https://nextjs.org/).

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

Other libraries and frameworks being used in this project includes:

- d3.js, a free, open-source JavaScript library for visualizing
  data. [d3.js Documentation](https://d3js.org/getting-started)
- Jest, a JavaScript testing framework used for unit testing and assertion. [Jest documentation](https://jestjs.io/).
- React, a JavaScript library for building user interfaces. [React Documentation](https://react.dev/).
- Ant Design, a popular UI framework for building web applications with a set of high-quality React
  components. [antd Documentation](https://ant.design/).
- Tailwind, a utility-first CSS framework that can be used to build any design directly in the
  markup. [Tailwind Documentation](https://tailwindcss.com/docs/installation).
- Visx, a data visualization library for React. [visx Documentation](https://airbnb.io/visx/docs).
- Husky, a tool used for setting up Git hooks
  easily. [Husky Documentation](https://typicode.github.io/husky/getting-started.html).
- ESLint, a static code analysis tool for identifying and fixing problems in your JavaScript
  code. [ESLint Documentation](https://eslint.org/docs/latest/).
- Prettier, a code formatter that helps you maintain consistent code formatting and style in your
  project. [prettier Documentation](https://prettier.io/).

## Getting Started

### Prerequisites

- npm

```bash
npm install npm@latest -g
```

- node

This repo was written with `node@v18.17.1`. If you are running a `node` that is older, it might cause some issues!

Please make sure to upgrade your `node` version to the latest **stable** release,
currently [20.9.0 LTS](https://nodejs.org/en).

### Installation

First, clone the repo

```bash
git clone git clone https://github.com/tum-v2/parloa-ui.git
```

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

#### ESLint

- To change the ESLint configuration, see [here](https://eslint.org/docs/latest/use/configure/).
- To learn more about Next.js and ESLint integration, as well as the rules and formats we are currently using,
  see [here](https://nextjs.org/docs/pages/building-your-application/configuring/eslint).

You can run ESLint manually by running:

```bash
npm run lint
```

This will check your code and give out errors and warnings, **but it will not fix them.**

**It is recommended to run this command before every commit.**

If you want ESLint to automatically fix the problems in your code, please run:

```bash
npm run lint:fix
```

Please note that ESLint cannot fix every problem automatically and will output the problems that still remain after this
call.

You can also integrate ESLint with your IDE:

- For WebStorm, follow the
  instructions [here](https://www.jetbrains.com/help/webstorm/eslint.html#ws_js_eslint_automatic_configuration).
- For VSCode, follow the instructions [here](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  .

**The repository already includes a `eslintrc.json` file and a working ESLint instance, so skip the steps in the
tutorials above that will have you download and configure ESLint.**

#### prettier

There is already a `.prettierrc` file available in the repository, you can change the prettier configuration from there.

You can run prettier manually by running:

```bash
npm run prettier:check
```

This will check every file and tell you if the files follow the rules of the prettier or not. Please note that this will
not automatically fix the problems in the files.

**It is recommended to run this command before every commit.**

If you want `prettier` to ignore some files, please create a `.prettierignore` file in the root of the project and add
the files you want to be ignored. See details [here](https://prettier.io/docs/en/ignore.html).

If you want prettier to fix your files for you, you can run the command:

```bash
npm run prettier:fix
```

Be careful as this will overwrite your files.

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
disable the `pre-commit` hook by running the following commands on your terminal:

```Bash
git commit --no-verify
# and
git push --no-verify
```

The `--no-verify` flag should disable Husky. Please use this carefully.

### Branch Structure

- Please **don't** merge your branches directly with the `main` branch. There is a `development` branch which you can
  merge your branches.
- Any new branch should be branched off of the `development` branch.
- This will allow for a stable `main` branch in case anything goes wrong with the integration.

## Testing

### Jest

For unit testing and for integration testing, we will use [Jest](https://jestjs.io/) library.

Jest will automatically run every test in the `__tests__` file when you run:

```bash
npm run test:unit
```

If you want to run a single test, you can run:

```bash
npm run test:unit -t "my-test-name"
```

Jest will only run tests that match the test name pattern you provide. Learn more in
the [documentation](https://jestjs.io/docs/cli#--testnamepatternregex).

You can also use Jest's `watch mode` by running:

```bash
npm run watch:unit
```

This will run Jest in watch mode, where you can watch files for changes and rerun tests related to changed files. For
more detailed information, check the [documentation](https://jestjs.io/docs/cli#--watch).

The default file location for Jest and the configuration options are stored inside `jest.config.js`, located in the root
directory.

In order for Jest to compile TypeScript files, we are using `ts-jest`. It is already configured in the `jest.config.js`
file. In order to learn more about `ts-jest`,
check [ts-jest Documentation](https://kulshekhar.github.io/ts-jest/docs/getting-started/installation).

## Documentation & Comments

In order to write consistent doc comments, we will follow the [TSDoc](https://tsdoc.org/) guidelines.

An example doc comment is given below:

```
/**
   * Returns the average of two numbers.
   *
   * @remarks
   * This method is part of the {@link core-library#Statistics | Statistics subsystem}.
   *
   * @param x - The first input number
   * @param y - The second input number
   * @returns The arithmetic mean of `x` and `y`
   *
   * @beta
   */
```

We are using `eslint-plugin-tsdoc` to integrate TSDoc with ESLint. This way, ESLint will issue a warning when the doc
comments are not in TSDoc standards.

To learn more about `eslint-plugin-tsdoc`, check [here](https://www.npmjs.com/package/eslint-plugin-tsdoc).

## Good Practices

### Branches

#### Recommended!

Use Linear’s branch name feature!

- Go to your task’s detail page.
- Click on the branch icon at the top right of the page to copy the branch’s name.
- Use that name to create a new branch in your local git repository.

Please note that these are not absolute rules, you can also define branch naming conventions but it should be consistent
over the board.

### Commits

**Descriptive Commit Messages**: Please provide short but descriptive commit messages for other developers to
understand.

### Pull Requests

**Describe your PR with as much detail as possible**

- What changes have you made? (Why?)
- Specify any important decisions you made that involve other teams
- Add screenshots to visualize your changes
