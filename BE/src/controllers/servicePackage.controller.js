"use strict";
const ServicePackage = require("../models/servicePackage.model");

const servicePackageController = {
  getAll: (req, res) => {
    ServicePackage.getAll(function (err, servicePackage) {
      if (err) res.send(err);
      res.send(servicePackage);
    });
  },
  getById: (req, res) => {},
  checkAuth: (req, res) => {},
  updateUsers: (req, res) => {},
  deleteUsers: (req, res) => {},
};

module.exports = servicePackageController;
