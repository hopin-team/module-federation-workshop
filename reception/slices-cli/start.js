const path = require("path");
const webpack = require("webpack");
const { readdirSync } = require("fs");
const WebpackDevServer = require("webpack-dev-server");
const webpackNanoDevConfig = require("./config/nano/webpack.dev.js");
const webpackMicroConfig = require("./config/micro/webpack.dev.js");
const packageJson = require("../package.json");
const { getFullNanoName, getNanos } = require("../slices-utils");

const HOST = process.env.HOST || "0.0.0.0";
const microPort = 8886;
const nanoPort = 8880;
const nanos = getNanos(
  readdirSync(path.join(process.cwd(), "src/nanos"), { withFileTypes: true }),
  nanoPort
);

Promise.all(
  nanos.map(({ name: nanoName, port }) => {
    const fullNanoName = getFullNanoName(packageJson, nanoName);
    const nanoConfig = webpackNanoDevConfig({
      packageJson,
      port,
      nanoName,
      fullNanoName,
    });
    const nanoCompiler = webpack(nanoConfig);
    const nanoDevServer = new WebpackDevServer(nanoCompiler);

    return new Promise((resolve, reject) => {
      nanoDevServer.listen(port, HOST, (err) => {
        if (err) {
          reject(err);
        }

        console.log(`
        🧩 nano frontend ${fullNanoName} running on ${HOST}:${port}`);

        resolve();
      });
    });
  })
).then(() => {
  const microConfig = webpackMicroConfig({
    packageJson,
    port: microPort,
    nanoPort,
    remotes: nanos.reduce((acc, { name: nanoName, port }) => {
      const name = getFullNanoName(packageJson, nanoName);
      acc[name] = `${name}@http://localhost:${port}/remoteEntry.js`;

      return acc;
    }, {}),
  });
  const microCompiler = webpack(microConfig);

  new WebpackDevServer(microCompiler).listen(microPort, HOST, (err) => {
    if (err) {
      console.log(err);
    }
  });
});
