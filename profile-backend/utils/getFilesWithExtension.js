const fs = require('fs');
const path = require('path');

function getFilesWithExtension(dirPath) {
  if (!fs.existsSync(dirPath)) return [];

  return fs.readdirSync(dirPath)
    .filter(file => /\.(png|jpe?g|webp|gif)$/i.test(file))
    .map(file => ({
      name: path.parse(file).name,
      filename: file,
      fullPath: `/assets/${path.basename(dirPath)}/${file}`
    }));
}
module.exports = { getFilesWithExtension };