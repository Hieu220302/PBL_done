const express = require("express");

const router = express.Router();

const usersController = require("../controllers/users.controller");

router.get("/", usersController.getAll);
router.get("/getAllByStaff", usersController.getAllByStaff);
router.get("/getAllSignUpStaff", usersController.getAllSignStaff);
router.get("/:id", usersController.getById);

router.post("/signin", usersController.checkAuth);
router.put("/signUpStaff", usersController.signUpStaff);
router.put("/updateRoleAndAddStaff", usersController.updateRoleAndAddStaff);
router.post("/signUpUser", usersController.signUpUser);
router.post("/checkUsername", usersController.checkUsername);
router.put("/updateUser", usersController.updateUsers);
module.exports = router;
