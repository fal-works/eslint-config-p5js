# @fal-works/eslint-config-p5js

ESLint config for p5.js. Supports TypeScript as well.

## Install

```shell
npm install --save-dev @fal-works/eslint-config-p5js
```

```shell
yarn add --dev @fal-works/eslint-config-p5js
```

```shell
pnpm add --save-dev @fal-works/eslint-config-p5js
```

## Usage

### Basic config

Add "p5js" to the `extends` list in your `eslintrc`.

This will add some globals and also overwrite the "no-unused-vars" rule.

```json
{
  "extends": [
    "eslint:recommended", // any other config
    "p5js" // this should come after the above
  ]
}
```

### With TypeScript

If you use TypeScript (and the `@typescript-eslint` plugin), add "p5js/@typescript-eslint" as well.

This overwrites the "@typescript-eslint/no-unused-vars" rule for p5.js (however note that globals will not be added).

```json
{
  "extends": [
    "eslint:recommended",
    "p5js",
    "plugin:@typescript-eslint/recommended",
    "p5js/@typescript-eslint", // this should come after the above
  ]
}
```

### With p5.sound

If you use p5.sound, add "p5js/sound" as well.

This will add globals that are specific to p5.sound.

```json
{
  "extends": [
    "eslint:recommended",
    "p5js",
    "p5js/sound",
  ]
}
```


## Other

Similar libraries:

- <https://www.npmjs.com/package/eslint-plugin-p5js> (not a config but a plugin)
- <https://www.npmjs.com/package/eslint-config-p5js> (not a scoped one)
