const fs = require("fs");

const saveSensJson = arr => {
  const now = Date.now();

  const fileName = `jsons/sens-${now.toString()}.json`;

  const data = JSON.stringify({ created_at: Date(now), sens: arr });

  const callback = err => {
    if (err) throw err;
    console.log("The file has been saved!");
  };

  fs.writeFile(fileName, data, callback);
  return Promise.resolve(arr);
};

module.exports = saveSensJson;
