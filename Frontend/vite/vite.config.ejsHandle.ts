import handlebars from "vite-plugin-handlebars";

const pageData = {
  "/index.html": {
    isHome: true,
    title: "Main Page",
  },
  "/test.html": {
    isHome: false,
    title: "List Page",
  },
};
// https://handlebarsjs.com/guide/
export function ejsHandler() {
  return handlebars({
    context(pagePath) {
      return {
        ...pageData[pagePath],
        domain: "hogehoge side",
      };
    },
  }) as any;
}
