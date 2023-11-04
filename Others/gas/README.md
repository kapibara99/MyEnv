# GAS template(clasp)

## 参考

clasp 公式
https://github.com/google/clasp

クラスメソッドのわかりやすいスターター記事
https://coxcox.hatenablog.com/entry/2019/04/05/222532

GAS ライブラリのリスト
https://github.com/contributorpw/google-apps-script-awesome-list

## 手順

1. npm install @google/clasp -g
   ※必ず、グローバルに入れること。
   ※ついでに[G Suite Developer Hub](https://script.google.com/home/usersettings)で Google Apps Script API を「オン」にしておく

2. clasp login
   これで、ルート階層に .clasprc.json が追加される

3. clasp create
   細かいコマンドは参考を見ること

4. coding
   @types/google-apps-script で、push の時、ts ファイルは、gs ファイルへコンパイルされます

5.
6. clasp push

## tips

### clasp open

ブラウザで APP プロジェクトを開く

### このシステムではスクリプトの実行が無効になっている error

Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process

### default の ignore は下記

```markdown
# ignore all files…

**/**

# except the extensions…

!appsscript.json
!**/\*.gs
!**/_.js
!\*\*/_.ts
!\*_/_.html

# ignore even valid files if in…

.git/**
node_modules/**
```

### export / import がデフォではできないという話

namespace でやるか、declare const で無理くりやるか。
大規模にファイル分割する必要がある時点で、GAS には向かないと思うので、declare で簡易的に import して動けば良いことにしている
https://github.com/google/clasp/blob/master/docs/typescript.md#the-namespace-statement-workaround

## そのうち追加したい

### 標準単体テストライブラリの追加
