# kapy UI catalog used Astro

## 開発手順

### コーディング

1. `npm run dev`
   1. ローカルサーバー立ち上がる
2. 別窓で`npm run watch`
   1. eslint watch
   2. hcm watch (CSS moduleの型定義の動的生成)
3. 適宜`npm run format`する

### ビルド

1. `astro check`
2. `tsc --noEmit`
3. `astro buikd`
4. `npm run afterBuild`
   1. newOrderCSSFiles.js (CSSファイルの依存関係を力技的に解決する。出力環境のみ、変な順番になるため)
   2. removeCommentsInCSSFiles.js (CSSファイルの中のファイル名用コメントを力技で消す。と言いつつ全消ししているのでスマートに今後したい。。)
      https://github.com/cssnano/cssnano/tree/master/packages/postcss-discard-comments
   3. aaa

## スタイリング戦略

いろいろ考えた結果、以下とした。

- ベースは CSS Modules(SASS) で行う
  - スタイル定義が CSS というのが、フロント出身でとっつきやすい
  - CSS in JS などのように lint の設定を変に tsx などにしなくて済むし、補完もしやすい
  - 静的だから特異なことがなくともパフォーマンス高い
  - 型定義に[happy-css-modules](https://github.com/mizdra/happy-css-modules)を使用
- Tailwind あたりは、一部コンポーネントで試してみてもいい

## 完全静的（ビルド後に手で更新したり触れるくらい）にするには？

## charset指定はとてもよしなにされる件

charset指定が不要（コメントやfont指定などでも必要ない場合）の時に、自動で取ってくれるらしい
rollupOptionで付与してもその後ろで消される
ので、要件で「必ず付与して」というのがある場合、buildを完全に終えたフェーズ（afterBuildコマンド）で付与する必要がある

### 出力されるHTMLのcssファイルの読み込みには癖があるので、力技的に置換する

おそらく50音？で並び、resetやbaseよりも、コンポーネントのstyleが先に記載・適用されてしまうため、依存関係がごちゃごちゃになる

```
index.html
  index.scss
test.html
  reset.scss
  index.scss
```

としたときに、test.htmlのdistビルドは

index.css→reset.css

という順番になる。
一旦、nodeスクリプトで、置換されるように、改訂しているが、どうにかならないかね

### build.inlineStylesheets: 'never'を設定する

### css(sass)は、importするastroファイルの数だけ、ビルドされる

例）

```
a.css → a.html,b.htmlそれぞれにimportされている場合、index.aaa.css,index.bbb.cssとして、中身が同じでも別ファイル出力になる
c.css → layout.astroにimportして、a.html,b.htmlに読ませる場合、index.ccc.cssとして、一つのみビルドされる
つまり、scss → index.scss → layout or template componentにすることで、ある程度CSSを集約したファイルビルドにできる
```

## memo

### ワークスペースのtypescriptバージョンを使用しないとき、astro拡張機能などとjs/tsの他拡張機能がバッティングする

- https://github.com/withastro/language-tools/issues/850
- https://github.com/microsoft/vscode/issues/174209

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
