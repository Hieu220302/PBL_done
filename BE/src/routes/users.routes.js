const express = require("express");

const router = express.Router();

const usersController = require("../controllers/users.controller");

router.get("/", usersController.getAll);
router.get("/getAllByStaff", usersController.getAllByStaff);
router.get("/:id", usersController.getById);

router.post("/signin", usersController.checkAuth);
router.put("/signUpStaff/:id", usersController.signUpStaff);
router.put("/updateUser", usersController.updateUsers);
module.exports = router;
