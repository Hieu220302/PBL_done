const express = require("express");

const router = express.Router();

const inforServiceController = require("../controllers/inforService.controller");

router.get("/", inforServiceController.getAll);

module.exports = router;
