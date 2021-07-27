const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = ({ packageJson, remotes }) => {
  const { name } = packageJson;

  return new ModuleFederationPlugin({
    name,
    filename: "remoteEntry.js",
    exposes: {
      "./App": "./src/micro/bootstrap.js",
    },
    remotes,
    shared: packageJson.dependencies,
  });
};
