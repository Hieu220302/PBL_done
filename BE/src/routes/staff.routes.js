const express = require("express");

const router = express.Router();

const staffController = require("../controllers/staff.controller");

router.get("/", staffController.getAll);
router.get("/customer", staffController.getAllByCustomer);
router.get("/:id", staffController.getById);
router.put("/changeFreeTime", staffController.changeFreeTime);
module.exports = router;
