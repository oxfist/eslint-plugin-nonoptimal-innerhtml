# eslint-plugin-nonoptimal-innerhtml

Don't use `innerHTML` inside loops or you'll have a slow website. See the [reasoning for this rule](./docs/rules/nonoptimal-innerhtml.md).

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-nonoptimal-innerhtml`:

```sh
npm install eslint-plugin-nonoptimal-innerhtml --save-dev
```

## Usage

Add `nonoptimal-innerhtml` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["nonoptimal-innerhtml"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "nonoptimal-innerhtml/nonoptimal-innerhtml": "warn"
  }
}
```
