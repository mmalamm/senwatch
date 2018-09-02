const fs = require("fs");

module.exports = arr => {
  const now = Date.now();
  fs.writeFile(
    `jsons/sens-${now.toString()}.json`,
    JSON.stringify({ created_at: Date(now), sens: arr }),
    err => {
      if (err) throw err;
      console.log("The file has been saved!");
    }
  );
};
