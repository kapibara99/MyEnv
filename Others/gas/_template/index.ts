// import { SomeUseCase } from "./src/test";

declare const exports: typeof import("./src/test");

function main() {
  const str = exports.SomeUseCase.run();
  console.log(str);
}
