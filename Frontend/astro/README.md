# kapy UI catalog used Astro

## スタイリング戦略

いろいろ考えた結果、以下とした。

- ベースは CSS Modules(SASS) で行う
  - スタイル定義が CSS というのが、フロント出身でとっつきやすい
  - CSS in JS などのように lint の設定を変に tsx などにしなくて済むし、補完もしやすい
  - 静的だから特異なことがなくともパフォーマンス高い
- Tailwind あたりは、一部コンポーネントで試してみてもいい

## memo

### bashで開かないと、prettierでエラーになる

もっというと、`astro check` などもエラーになる

さらに、bashでも、前の実行から間が空いてない（10秒程度？）と、エラーになる

```
$ npm run build

> frontend@0.0.1 build
> astro check && tsc --noEmit && astro build

16:31:22 Types generated 790ms
16:31:22 [check] Getting diagnostics for Astro files in ...
assertion failed [block != nullptr]: BasicBlock requested for unrecognized address
(BuilderBase.h:550 block_for_offset)
 sh: line 1: 92572 Abort trap: 6           astro check
```

### dependencies にreactなどが入っている場合、プロジェクトに使用されていなくても、JSはビルドされる

`_astro/client.XXXXXX.js` のこと

HTMLに読まれている訳ではないから、UX上は問題ないけど、ビルドパフォーマンス的には無駄なので、注意

`client:load` などでCSR設定を行うと、一緒に読まれたりする

## 元README

```sh
npm create astro@latest -- --template basics
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/basics)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/basics)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/basics/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![just-the-basics](https://github.com/withastro/astro/assets/2244813/a0a5533c-a856-4198-8470-2d67b1d7c554)

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
