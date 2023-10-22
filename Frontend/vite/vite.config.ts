import { defineConfig } from "vite";

//https://ja.vitejs.dev/config/shared-options.html
export default defineConfig({
  // https://ja.vitejs.dev/config/server-options.html
  server: {
    port: 8080,
    host: true, // IPアドレスを有効
    open: true,
  },
  build: {
    assetsDir: "_shared",
    cssCodeSplit: false, // cssファイルをチャンクごとに出力する
    minify: true, // default js の minify 設定
    // cssMinify: false,// css minifyせずに出力する
  },
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  json: {
    stringify: true,
  },
  assetsInclude: ["*.woff"], // 静的アセットとして扱う追加パターンを指定
  appType: "mpa",
});
