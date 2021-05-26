const packageJsonDeps = require("./package.json").dependencies;

module.exports = {
  future: { webpack5: true },
  webpack: (config, options) => {
    const { ModuleFederationPlugin } = options.webpack.container;

    config.plugins.push(
      new ModuleFederationPlugin({
        remotes: {
          chat: "chat@http://localhost:8888/remoteEntry.js",
        },
        shared: {
          ...packageJsonDeps,
          react: {
            singleton: true,
            eager: true,
            requiredVersion: packageJsonDeps.react,
          },
          "react-dom": {
            singleton: true,
            eager: true,
            requiredVersion: packageJsonDeps["react-dom"],
          },
        },
      })
    );

    return config;
  },

  webpackDevMiddleware: (config) => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config;
  },
};
