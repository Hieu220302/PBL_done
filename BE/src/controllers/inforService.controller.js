"use strict";
const InforService = require("../models/inforService.model");

const groupServiceController = {
  getAll: (req, res) => {
    InforService.getAll(function (err, inforService) {
      if (err) res.send(err);
      res.send(inforService);
    });
  },
  getById: (req, res) => {},
  checkAuth: (req, res) => {},
  updateUsers: (req, res) => {},
  deleteUsers: (req, res) => {},
};

module.exports = groupServiceController;
