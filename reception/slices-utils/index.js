const camelcase = require("camelcase");

function getRootDevName(name) {
  return `root-${name}-dev`;
}

function getFullNanoName(packageJson, nanoName) {
  const { name } = packageJson;
  return camelcase(`${name}-${nanoName}`);
}

function getNanos(directory, port = 8000) {
  return directory
    .filter((dirent) => dirent.isDirectory())
    .map(({ name }, index) => ({
      name,
      port: port + index,
    }));
}

module.exports = {
  getRootDevName,
  getFullNanoName,
  getNanos,
};
