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

app.get("/file", (req, res) =>
  res.sendFile(path.join(__dirname, "jsons", "sens-1535927178221.json"))
);
