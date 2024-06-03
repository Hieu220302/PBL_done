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
const groupServiceRoute = require("./src/routes/groupService.routes");
const inforServiceRoute = require("./src/routes/inforService.routes");
const orderServiceRoute = require("./src/routes/orderService.routes");
const servicePackageRoute = require("./src/routes/servicePackage.routes");
const staffRoutes = require("./src/routes/staff.routes");
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/groupService", groupServiceRoute);
app.use("/api/v1/inforService", inforServiceRoute);
app.use("/api/v1/orderService", orderServiceRoute);
app.use("/api/v1/staff", staffRoutes);
app.use("/api/v1/servicePackage", servicePackageRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
