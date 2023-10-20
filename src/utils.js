//Para poder exportar el __dirname, debemos hacerlo de la siguiente manera:
const fileURLToPath = require("url").fileURLToPath;
const dirname = require("path");
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname.dirname(__filename);

module.exports = __dirname;
