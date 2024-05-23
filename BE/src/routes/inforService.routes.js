const express = require("express");

const router = express.Router();

const inforGroupController = require("../controllers/inforService.controller");

router.get("/", inforGroupController.getAll);

module.exports = router;
