const express = require("express");
const favicon = require("serve-favicon");
const path = require("path");
const secrets = require("../secrets");
const app = express();
const port = process.env.PORT || 5050;
const axios = require("axios");
const cors = require("cors");

console.log(secrets);

app.use(cors());

app.use("/api", (req, res) => {
  axios({
    url: "https://api.propublica.org/congress/v1/115/senate/members.json",
    method: "get",
    headers: secrets.propublicaHeader
  })
    .then(data => res.send(data.data.results[0]))
    .catch(e => res.status(400).send(e));
});

app.use(express.static(path.join(__dirname, "gui", "build")));

app.use(favicon(path.join(__dirname, "gui", "build", "favicon.ico")));

app.listen(port, () => console.log("server running on port", port));

const fs = require("fs");

app.get("/file", (req, res) => {
  const filename = fs
    .readdirSync("./jsons")
    .sort((a, b) => +a.slice(5) - +b.slice(5))
    .pop();

  res.sendFile(path.join(__dirname, "jsons", filename));
});
app.get("/file_size", (req, res) => {
  const filename = fs
    .readdirSync("./jsons")
    .sort((a, b) => +a.slice(5) - +b.slice(5))
    .pop();

  const stats = fs.statSync(path.join(__dirname, "jsons", filename));
  const fileSizeInBytes = stats.size;
  //Convert the file size to megabytes (optional)
  const fileSizeInMegabytes = fileSizeInBytes / 1000000.0;
  res.send(fileSizeInMegabytes.toString());
});
