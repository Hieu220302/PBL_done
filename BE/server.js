const express = require("express");
const app = express();
require("dotenv").config();

const bodyParser = require("body-parser");

const port = process.env.PORT || 8888;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to my web server");
});
const usersRoutes = require("./src/routes/users.routes");

app.use("/api/v1/users", usersRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
