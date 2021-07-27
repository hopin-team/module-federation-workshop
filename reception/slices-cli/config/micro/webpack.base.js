const HtmlWebpackPlugin = require("html-webpack-plugin");
const VirtualModulesPlugin = require("webpack-virtual-modules");
const ModuleScopePlugin = require("../../../slices-utils/ModuleScopePlugin");
const fs = require("fs");
const path = require("path");
const { getRootDevName } = require("../../../slices-utils");

const templateIndexHtml = ({ name }) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>${name}</title>
  </head>
  <body>
    <div id="${getRootDevName(name)}"></div>
  </body>
</html>
`;

const appDirectory = fs.realpathSync(process.cwd());
const resolvePath = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = ({ packageJson }) => {
  const { name } = packageJson;

  return {
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-react",
                  {
                    runtime: "automatic",
                  },
                ],
                "@babel/preset-env",
              ],
              plugins: ["@babel/plugin-transform-runtime"],
            },
          },
        },
      ],
    },
    plugins: [
      new VirtualModulesPlugin({
        "./public/index.html": templateIndexHtml({ name }),
        "./src/index.js": `import("./micro/bootstrap");`,
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
      // TODO THIS PLUGIN DOESN'T WORK WITH WEBPACK 5
      // new ModuleScopePlugin(resolvePath("src/micro")),
    ],
    resolve: {
      extensions: [".js", ".jsx"],
    },
  };
};
