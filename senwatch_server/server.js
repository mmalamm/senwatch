const express = require("express");
const path = require("path");
const app = express();

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "..", "senwatch_react", "build")));
app.listen(port, () => console.log("server running on port", port));
