const express = require("express");
const path = require("path");
const app = express();

const port = process.env.PORT || 3000;

// backend


// frontend
const publicPath = path.join(__dirname, "..", "senwatch_frontend", "build");
app.use(express.static(publicPath));

// listen
app.listen(port, () => console.log("server running on port", port));
