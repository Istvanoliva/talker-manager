const fs = require('fs').promises;

const getTalkers = async () => {  
  const list = JSON.parse(await fs.readFile('./talker.json'));
  return list;
};

module.exports = getTalkers;