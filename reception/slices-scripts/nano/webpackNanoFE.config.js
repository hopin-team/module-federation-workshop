// const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

// // TODO CREATE ANOTER SLICE AND REMOVE HARDCODED SLICE VALUES HERE
// // HOW DO WE DEAL WITH SINGLETON TRUE OF FUTURE LIBRARIES? SHALL WE ADD AN ARGUMENT FOR THAT?
// // SHOULD SLICES IN THIS MF BE ABLE TO LOAD SLICES IN THIS MF?
// //    yes
// // WHERE ARE THE SLICES? (do build for each and see how to deploy them)
// //      - Many entries in the same ModuleFederationPlugin({ ?? 👈 PREFERED
// //      - Many new ModuleFederationPlugin in the same port ??
// //      - One port and webpack running for each new ModuleFederationPlugin ??
// // HOW DO WE ASSIGN PORTS? max 65535
// // mf 8250
// // mf 8500
// // mf 8750
// // mf 9000  -> 200 MF

// function webpackNanoConfig({ packageJson, port }) {
//   const packageJsonDeps = packageJson.dependencies;

//   return {
//     mode: "development",
//     entry: "./nanos/schedule/src/index.jsx",
//     devServer: {
//       port,
//     },
//     plugins: [
//       new ModuleFederationPlugin({
//         name: "receptionNanos",
//         filename: "remoteEntry.js",
//         exposes: {
//           "./Schedule": "./nanos/schedule/src/index.jsx",
//           "./Sponsors": "./nanos/sponsors/src/index.jsx",
//         },
//         shared: {
//           ...packageJsonDeps,
//           react: {
//             singleton: true,
//             requiredVersion: packageJsonDeps.react,
//           },
//           "react-dom": {
//             singleton: true,
//             requiredVersion: packageJsonDeps["react-dom"],
//           },
//           "react-router-dom": {
//             singleton: true,
//             version: packageJsonDeps["react-router-dom"],
//           },
//         },
//       }),
//     ],
//     module: {
//       // rules: [
//       //   {
//       //     test: /\.(js|jsx)$/,
//       //     exclude: /node_modules/,
//       //     use: {
//       //       loader: "babel-loader",
//       //       options: {
//       //         presets: [
//       //           [
//       //             "@babel/preset-react",
//       //             {
//       //               runtime: "automatic",
//       //             },
//       //           ],
//       //           "@babel/preset-env",
//       //         ],
//       //         // plugins: ["@babel/plugin-transform-runtime"],
//       //       },
//       //     },
//       //   },
//       // ],
//     },
//     resolve: {
//       extensions: [".js", ".jsx"],
//     },
//   };
// }

// module.exports = webpackNanoConfig;
