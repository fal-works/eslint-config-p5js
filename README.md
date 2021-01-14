# @fal-works/eslint-config-p5js

[ESLint](https://eslint.org/) config for [p5.js](https://p5js.org/).
Supports [TypeScript](https://www.typescriptlang.org/) as well.

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

Add the config name "@fal-works/p5js" to the `extends` list in your `eslintrc`.

This will add some globals and also overwrite the "no-unused-vars" rule.  
So this should come after other extensions which also include "no-unused-vars".

```json
{
  "extends": [
    "eslint:recommended",
    "@fal-works/p5js"
  ]
}
```

### With TypeScript

If you use TypeScript (and the [@typescript-eslint](https://github.com/typescript-eslint/typescript-eslint) plugin), add "p5js/@typescript-eslint" as well.

This overwrites the "@typescript-eslint/no-unused-vars" rule for p5.js (no additional globals).
So this should come after other extensions which also include "@typescript-eslint/no-unused-vars".

```json
{
  "extends": [
    "eslint:recommended",
    "@fal-works/p5js",
    "plugin:@typescript-eslint/recommended",
    "@fal-works/p5js/@typescript-eslint",
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
    "@fal-works/p5js",
    "@fal-works/p5js/sound",
  ]
}
```


## Other

Similar libraries:

- <https://www.npmjs.com/package/eslint-plugin-p5js> (not a config but a plugin)
- <https://www.npmjs.com/package/eslint-config-p5js> (not a scoped one)
