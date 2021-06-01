const packageJsonDeps = require("./package.json").dependencies;

module.exports = {
  future: { webpack5: true },
  webpack: (config, options) => {
    const federationConfig = {
      remotes: {
        chat: "chat@http://localhost:8888/remoteEntry.js",
        reception: "reception@http://localhost:8886/remoteEntry.js",
        sessions: "sessions@http://localhost:8885/remoteEntry.js",
        session: "session@http://localhost:8884/remoteEntry.js",
      },
      shared: {
        ...packageJsonDeps,
        react: {
          eager: true,
          requiredVersion: packageJsonDeps.react,
        },
        "react-dom": {
          eager: true,
          requiredVersion: packageJsonDeps["react-dom"],
        },
      },
    };

    config.plugins.push(
      new options.webpack.container.ModuleFederationPlugin(federationConfig)
    );

    return config;
  },

  webpackDevMiddleware: (config) => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config;
  },
};
