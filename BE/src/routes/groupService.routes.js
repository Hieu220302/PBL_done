const express = require("express");

const router = express.Router();

const groupServiceController = require("../controllers/groupService.controller");

router.get("/", groupServiceController.getAll);

module.exports = router;
