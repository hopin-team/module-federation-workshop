const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
// const configFactory = require('../src/webpack.config');
const webpackNanoDevConfig = require("./nano/webpack.dev.js");
const webpackMicroConfig = require("./webpackMicroFE.config.js");
const packageJson = require("../package.json");

const HOST = process.env.HOST || "0.0.0.0";
const nanoPort = 8880;
const microPort = 8886;

const nanoConfig = webpackNanoDevConfig({ packageJson, port: nanoPort });
const nanoCompiler = webpack(nanoConfig);

const microConfig = webpackMicroConfig({ packageJson, port: microPort });
const microCompiler = webpack(microConfig);

// const devServer = new WebpackDevServer(compiler, serverConfig);
const nanoDevServer = new WebpackDevServer(nanoCompiler);
const microDevServer = new WebpackDevServer(microCompiler);

nanoDevServer.listen(nanoPort, HOST, (err) => {
  if (err) {
    return console.log(err);
  }

  microDevServer.listen(microPort, HOST, (err) => {
    if (err) {
      return console.log(err);
    }
  });
  // console.log(chalk.cyan(`Starting the development server on host ${HOST} \n`));
});
