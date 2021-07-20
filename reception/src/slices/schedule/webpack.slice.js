const packageJson = require("./package.json");

module.exports = (env) =>
  webpackSliceConfig({
    packageJson,
    // entry: resolve(__dirname, "src", "bootstrap.tsx"), // NOT REQUIRED ANYMORE
    distDir: resolve(__dirname, "runtime"),
    l10nDir: resolve(__dirname, "src", "locales"),
    // exposeSlicePath: "./src/Session.tsx", // DEFAULTS TO "./src/components/index"
    devMode: !!env?.devMode,
  });
