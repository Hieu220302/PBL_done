"use strict";
const Users = require("../models/users.model");
// users.controller.js
const usersController = {
  getAll: (req, res) => {
    Users.getAll(function (err, users) {
      if (err) res.send(err);
      res.send(users);
    });
  },
  getAllByStaff: (req, res) => {
    Users.getAllByStaff(function (err, users) {
      if (err) res.send(err);
      res.send(users);
    });
  },
  getById: (req, res) => {
    Users.getById(req.params.id, function (err, users) {
      if (err) res.send(err);
      res.send(users);
    });
  },
  checkAuth: (req, res) => {
    const { userName, password } = req.body;
    Users.checkAuth(userName, password, function (err, users) {
      if (err) res.send(err);
      res.send(users);
    });
  },
  updateUsers: (req, res) => {
    Users.updateUser(function (err, users) {
      if (err) res.send(err);
      res.send(users);
    }, req);
  },
  signUpStaff: (req, res) => {
    Users.signUpStaff(req.params.id, function (err, users) {
      if (err) res.send(err);
      res.send(users);
    });
  },
  deleteUsers: (req, res) => {},
};

module.exports = usersController;
