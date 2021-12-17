const path = require("path")
const realFs = jest.requireActual("fs")
const fs = jest.createMockFromModule("fs")

const mockedFiles = {}

function __setMockFile(filePath, fileContent) {
  mockedFiles[filePath] = fileContent
}

function readFileSync(filePath, ...restOfArgs) {
  if (/\.env\.?/.test(filePath)) {
    return realFs.readFileSync(filePath, ...restOfArgs)
  }

  return mockedFiles[filePath]
}

function existsSync(filePath) {
  return (mockedFiles[filePath] != null)
    || Object.keys(mockedFiles).some(fp => (new RegExp(`^${filePath}`)).test(fp))
    || realFs.existsSync(filePath)
}

function readdirSync(folderPath) {
  return Object.keys(mockedFiles)
    .filter(fpath => (new RegExp(`^${folderPath}`)).test(fpath))
    .map(fpath => (fpath
      .replace(folderPath, "")
      .replace(new RegExp(`^${path.sep}`), "")
      .split(path.sep)
      [0]
    ))
}

module.exports = fs
module.exports.existsSync = existsSync
module.exports.readdirSync = readdirSync
module.exports.readFileSync = readFileSync
module.exports.__setMockFile = __setMockFile
