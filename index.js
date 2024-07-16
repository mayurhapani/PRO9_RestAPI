const express = require("express");
const db = require("./config/database");
const app = express();
const PORT = 8001;

app.listen(PORT, () => {
  db();
  console.log("server started on http://localhost" + PORT);
});
