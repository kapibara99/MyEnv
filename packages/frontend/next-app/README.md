# NextJS ボイラーテンプレート

## ディレクトリ設計

src

- L app
- L assets
- L components
- L infrastructure
- L service

### app

NextJS の Page を格納する。

### assets

src 内で import される、フォント、画像、その他ファイルを格納する。

### components

コンポーネントを格納する。Storybook で管理可能な範囲に集約される。

#### atoms

最小単位のコンポーネント。

#### molecules

atoms の複合体として定義されるコンポーネント。

#### organisms

atoms/molecules の集合体で、service で定義された container コンポーネントから値を受け取り、atoms/molecules らへ流し込む役割。

#### templates

異なる organisms の集合体で、特定のまとまりを定義するメリットがある際に運用する。

主にヘッダーや、グローバルナビゲーション、規約スクロールなどのモーダルなどを想定している。

### service

イメージとしては、useCase や Application 層、カスタム hooks などの領域が、関心ごとにディレクトリで分かれ格納される。

#### Auth(例)

- L useAuth.tsx
- L auth.d.ts

#### productList(例)

- L productList.d.ts
- L productList.container.tsx
- L productList.functions.ts

### infrastructure

外部サービスとの連結を主眼とするコンポーネントやロジック、型定義を担う。
例）aws, firebase , Saas ...
