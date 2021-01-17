# @fal-works/eslint-config-p5js

[ESLint](https://eslint.org/) config for [p5.js](https://p5js.org/).
Supports [TypeScript](https://www.typescriptlang.org/) as well.

This config is intended for [p5.js global mode](https://github.com/processing/p5.js/wiki/Global-and-instance-mode).  
On instance mode, just adding `p5` as a global variable should be enough.


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

Add the config name `@fal-works/p5js` to the `extends` list in your `eslintrc`.

This will add some globals and also overwrite the `no-unused-vars` rule.  
So this should come after other extensions which also include `no-unused-vars`.

```json
{
  "extends": [
    "eslint:recommended",
    "@fal-works/p5js"
  ]
}
```

### With p5.sound

If you use p5.sound, add the config name `@fal-works/p5js/sound` as well.

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

### With TypeScript

If you use TypeScript (and the [@typescript-eslint](https://github.com/typescript-eslint/typescript-eslint) plugin), use the config name `@fal-works/p5js/@typescript-eslint` instead.

This will:

- turn off the default `no-unused-vars` rule (just like @typescript-eslint does).
- overwrite the `@typescript-eslint/no-unused-vars` rule for p5.js.

So this should come after other extensions which also include `@typescript-eslint/no-unused-vars`.

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "@fal-works/p5js/@typescript-eslint",
  ]
}
```

This config does not add globals, nor does it need to; they should be managed by [@types/p5](https://www.npmjs.com/package/@types/p5), the type declaration for p5.js.  
However, the type declaration may not be always up to date; sometimes you might have to escape some variables (that are not properly declared) with `any`, or provide additional type declaration yourself.

If using TypeScript, you can easily do a workaround instead of using this config. You can avoid `no-unused-vars` errors by simply exposing some functions to the global scope, like:

```js
Object.assign(window, { setup, draw });
```

...so that they are not left unused. And you'll have to do this anyway if you use a module bundler.


## Other

Similar libraries:

- <https://www.npmjs.com/package/eslint-plugin-p5js> by marksherman (not a config but a plugin)
- <https://www.npmjs.com/package/eslint-config-p5js> by yangsu (not a scoped one)
