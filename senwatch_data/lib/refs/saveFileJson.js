const fs = require("fs");

const saveFileJson = (data, filename) => {
  const now = Date.now();
  fs.writeFile(
    filename,
    JSON.stringify({
      created_at: Date(now),
      filename,
      data
    })
  );
  console.log(`Saved ${filename} to disk!!`);
};

module.exports = saveFileJson;
