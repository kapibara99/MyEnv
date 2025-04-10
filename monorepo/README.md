# memo

2025/4/10 時点

- Next.js の`next dev --turbopack`は、tsconfig.json の extends で親階層のものをパス解決できないっぽい。
- Nest.jsの`tsbuildinfo`ファイルは不調。tmpフォルダとかに残しておくと、すぐにサーバーがエラーになるから、distにおいて、一緒にcleanするのが良さそう。
