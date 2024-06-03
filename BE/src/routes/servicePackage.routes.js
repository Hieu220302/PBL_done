const express = require("express");

const router = express.Router();

const servicePackageController = require("../controllers/servicePackage.controller");

router.get("/", servicePackageController.getAll);

module.exports = router;
