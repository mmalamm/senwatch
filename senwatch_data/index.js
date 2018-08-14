const express = require("express");
const favicon = require("serve-favicon");
const path = require("path");
const keys = require("../keys");
const app = express();
const port = process.env.PORT || 3000;

console.log(keys);

app.use(express.static(path.join(__dirname, "gui", "build")));

app.use(favicon(path.join(__dirname, "gui", "build", "favicon.ico")));

app.listen(port, () => console.log("server running on port", port));
