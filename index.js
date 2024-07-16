const express = require("express");
const db = require("./config/database");
const router = require("./routers/user.router");
const app = express();
const PORT = 8001;
const cookie = require("cookie-parser");

app.use(cookie());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.listen(PORT, () => {
  db();
  console.log("server started on http://localhost:" + PORT);
});
