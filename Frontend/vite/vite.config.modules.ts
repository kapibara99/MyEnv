import fs from "fs";
import path from "path";
export const root = "src";

/*
  この形を自動的に作る
  input:{
    index: resolve(__dirname, './index.html'),
    hogehoge_test: resolve(__dirname, './hogehoge/test.html')
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
      if (dirPath === path.resolve(__dirname, root)) {
        targetName = path.parse(itemPath).name;
      } else {
        const relativePath = path.relative(
          path.resolve(__dirname, root),
          dirPath
        );
        const dirName = relativePath.replace(/\//g, "_");
        targetName = `${dirName}_${path.parse(itemPath).name}`;
      }

      // pathを決定する
      const relativePath = path.relative(
        path.resolve(__dirname, root),
        itemPath
      );
      const filePath = `/${relativePath}`;
      // console.log("filePath", path.parse(relativePath).name, filePath);
      files.push({ name: targetName.replace("pages_", ""), path: filePath });
    }
  }
}

export const exportedInputFiles = () => {
  readDirectory(path.resolve(__dirname, root));
  const inputFiles = {};
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    inputFiles[file.name] = path.resolve(__dirname, "./" + root + file.path);
  }
  // console.log("inputFiles", inputFiles);
  return inputFiles;
};
