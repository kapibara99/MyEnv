## 前提

・HTMLを最上位の構成(ATOMICで言うpages)とすること
・あくまで、コンポーネントはUIに限定し、ロジックやデータハンドリングは、以下の流れに沿うこと
インフラ（API通信やStateなどを管理する）
↓
サービス（インフラで受け取ったデータを表示用に加工したり、処理を加える。おそらくアプリケーション層）
↓
コンポーネント（データなどから表示を生成する）

・1.0やプロジェクト名などでの分割とコモンで分けられるようにしたい
・

## 設計粒度や対象の想定

・APIやBackendから結合したデータを用いての表示構築・データ送信があること
・プロジェクトはグロースによって、ある程度ソースの改修も継続していくことを想定

## モジュール（フロントエンド）構造

- ユーティリティ
- アセットリソース
- コンポーネント（UI）
  - \_コモン？グローバル？パーツ
  - \_some projects
    - XXXパーツ
  - ヘディング
  - カラム、グリッド
  - ヘッダー
  - フッター
  - AAAフォーム
- サービス（インフラで受け取ったドメインモデルを、表示しやすいように加工したり処理を加える層、たぶんアプリケーション層）
- ドメインモデル（model、dbと同一の型を登録したり、ドメインモデルを反映する）
- インフラ（API叩いたりデータ永続化）

## その他の対応策

・接頭辞でディレクトリ関係をわかりやすくする