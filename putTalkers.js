const fs = require('fs').promises;

const putTalkers = async (array) => {
  await fs.writeFile('./talker.json', JSON.stringify(array));
};

module.exports = putTalkers;