import { defineConfig } from "vite";
import path from "path";
import { exportedInputFiles } from "./vite.config.modules"; // 生成したHTML page list

//https://ja.vitejs.dev/config/shared-options.html
export default defineConfig({
  appType: "mpa", // multi page app
  root: "src/pages", // document root HTMLを配置するフォルダをrootに設定する。
  resolve: {
    // path alias setting
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
  publicDir: path.resolve(__dirname, "public"), // 静的アセット格納フォルダ

  // https://ja.vitejs.dev/config/server-options.html
  server: {
    port: 8080,
    host: true, // IPアドレスを有効
    open: true,
  },

  assetsInclude: ["*.woff"], // 静的アセットとして扱う追加パターンを指定
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true, // dist内 clean
    cssCodeSplit: false, // cssファイルをチャンクごとに出力する
    minify: true, // default js の minify 設定
    cssMinify: false, // css minifyせずに出力する

    rollupOptions: {
      // pages html をinputする
      input: exportedInputFiles(),
      //ファイル出力設定
      output: {
        assetFileNames: (assetInfo: any) => {
          let extType = assetInfo.name.split(".")[1];
          if (/ttf|otf|eot|woff|woff2/i.test(extType)) {
            //Webフォントファイルの振り分け
            extType = "fonts";
          } else if (/png|jpe?g|svg|webp|gif|tiff|bmp|ico/i.test(extType)) {
            // images
            extType = "images";
          }
          //ビルド時のCSS名を明記してコントロールする
          if (extType === "css") {
            return `_shared/css/style.css`;
          }
          // その他ファイル
          return `_shared/${extType}/[name][extname]`;
        },
        chunkFileNames: "_shared/js/[name].js",
        entryFileNames: "_shared/js/[name].js",
      },
    },
  },
  json: {
    // json静的タイプ追加
    stringify: true,
  },
});