const path = require("path");
const chalk = require("chalk"); // TODO use this instead of console.log
const { readdirSync } = require("fs");
const fs = require("fs-extra");
const webpack = require("webpack");
const configMicro = require("./config/micro/webpack.prod");
const configNano = require("./config/nano/webpack.prod");
const packageJson = require("../package.json");
const { getFullNanoName, getNanos } = require("../slices-utils");

const domain = process.env.domain || "http://test.com";
const outputPathMicro = path.join(process.cwd(), "dist/micro");
const outputPathNano = path.join(process.cwd(), "dist/nanos");

fs.emptyDirSync(outputPathMicro);
fs.emptyDirSync(outputPathNano);

const nanos = getNanos(
  readdirSync(path.join(process.cwd(), "src/nanos"), { withFileTypes: true })
);

nanos.map(({ name: nanoName }) => {
  console.log(`⚙️  building nano frontend ${nanoName}`);
  webpack(
    configNano({
      packageJson,
      outputPath: `${outputPathNano}/${nanoName}`,
      fullNanoName: getFullNanoName(packageJson, nanoName),
      nanoName,
    })
  ).run((err, stats) => {
    if (err) {
      console.log("🔥 Error building nano frontend", err);
    }
    console.log(`✅ built nano frontend ${nanoName}`);
  });
});

const compilerMicro = webpack(
  configMicro({
    packageJson,
    outputPath: outputPathMicro,
    remotes: nanos.reduce((acc, { name: nanoName }) => {
      const fullNanoName = getFullNanoName(packageJson, nanoName);
      const resource = `${fullNanoName}@${domain}/${fullNanoName}/latest/remoteEntry.js`;
      acc[fullNanoName] = resource;

      return acc;
    }, {}),
  })
);

console.log(`⚙️  building micro frontend ${packageJson.name}`);

compilerMicro.run((err, stats) => {
  if (err) {
    console.log("🔥 Error building microfrontend", err);
  }
  console.log(`✅ built micro frontend ${packageJson.name}`);
});
