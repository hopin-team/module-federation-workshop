const packageJsonDeps = require("./package.json").dependencies;
// const { withModuleFederation } = require("@module-federation/nextjs-mf");
const withModuleFederation = require("./withModuleFederation");

module.exports = {
  future: { webpack5: true },
  webpack: (config, options) => {
    const mfConf = {
      mergeRuntime: true, //experimental
      name: "nexthost",
      library: {
        type: config.output.libraryTarget,
        name: "nexthost",
      },
      filename: "static/runtime/remoteEntry.js",
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

    config.cache = false;
    if (!options.isServer) {
      config.output.publicPath = `http://localhost:3001/_next/`;
    }
    withModuleFederation(config, options, mfConf);

    return config;
  },

  webpackDevMiddleware: (config) => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config;
  },
};
