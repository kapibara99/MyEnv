import { defineConfig } from "vite";
import path from "path";
import fs from "fs";
const root = "src";

/*
  この形を自動的に作る
  input:{
    index: resolve(__dirname, './src/index.html'),
    list: resolve(__dirname, './src/list.html')
  }
*/
type fileConfigType = {
  name: string;
  path: string;
};
const files: fileConfigType[] = [];
function readDirectory(dirPath: string) {
  const items = fs.readdirSync(dirPath);

  for (const item of items) {
    const itemPath = path.join(dirPath, item);
    if (fs.statSync(itemPath).isDirectory()) {
      // componentsディレクトリを除外する
      if (item === "components") {
        continue;
      }
      readDirectory(itemPath);
    } else {
      // htmlファイル以外を除外する
      if (path.extname(itemPath) !== ".html") {
        continue;
      }

      // nameを決定する
      let targetName = "";
      if (dirPath === path.resolve(__dirname, "src")) {
        targetName = path.parse(itemPath).name;
      } else {
        const relativePath = path.relative(
          path.resolve(__dirname, "src"),
          dirPath
        );
        const dirName = relativePath.replace(/\//g, "_");
        targetName = `${dirName}_${path.parse(itemPath).name}`;
      }

      // pathを決定する
      const relativePath = path.relative(
        path.resolve(__dirname, "src"),
        itemPath
      );
      const filePath = `/${relativePath}`;
      console.log("filePath", path.parse(relativePath).name, filePath);
      files.push({ name: targetName.replace("pages_", ""), path: filePath });
    }
  }
}
readDirectory(path.resolve(__dirname, "src"));
const inputFiles = {};
for (let i = 0; i < files.length; i++) {
  const file = files[i];
  inputFiles[file.name] = path.resolve(__dirname, "./src" + file.path);
}
console.log("inputFiles", inputFiles);

//https://ja.vitejs.dev/config/shared-options.html
export default defineConfig({
  root: "src/pages",
  publicDir: path.resolve(__dirname, "public"), // 静的アセット格納フォルダ

  // https://ja.vitejs.dev/config/server-options.html
  server: {
    port: 8080,
    host: true, // IPアドレスを有効
    open: true,
  },
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true, // dist内 clean
    cssCodeSplit: false, // cssファイルをチャンクごとに出力する
    minify: true, // default js の minify 設定
    cssMinify: false, // css minifyせずに出力する
    rollupOptions: {
      // pages html をinputする
      input: inputFiles,
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
  resolve: {
    alias: [{ find: "@", replacement: "../src" }],
  },
  json: {
    stringify: true,
  },
  assetsInclude: ["*.woff"], // 静的アセットとして扱う追加パターンを指定
  appType: "mpa",
});
