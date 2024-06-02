const express = require("express");

const router = express.Router();

const usersController = require("../controllers/staff.controller");

router.get("/", usersController.getAll);
router.get("/customer", usersController.getAllByCustomer);
router.get("/:id", usersController.getById);

module.exports = router;
