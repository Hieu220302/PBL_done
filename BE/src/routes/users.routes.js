const express = require("express");

const router = express.Router();

const usersController = require("../controllers/users.controller");

router.get("/", usersController.getAll);

router.get("/:id", usersController.getById);

router.post("/signin", usersController.checkAuth);

module.exports = router;
