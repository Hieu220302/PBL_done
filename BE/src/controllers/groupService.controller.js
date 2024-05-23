"use strict";
const GroupService = require("../models/groupService.model");

const groupServiceController = {
  getAll: (req, res) => {
    GroupService.getAll(function (err, groupService) {
      if (err) res.send(err);
      res.send(groupService);
    });
  },
  getById: (req, res) => {},
  checkAuth: (req, res) => {},
  updateUsers: (req, res) => {},
  deleteUsers: (req, res) => {},
};

module.exports = groupServiceController;
