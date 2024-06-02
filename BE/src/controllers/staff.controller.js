"use strict";
const Staff = require("../models/staff.model");
const staffController = {
  getAll: (req, res) => {
    Staff.getAll(function (err, staff) {
      if (err) res.send(err);
      res.send(staff);
    });
  },
  getAllByCustomer: (req, res) => {
    Staff.getAllByCustomer(function (err, staff) {
      if (err) res.send(err);
      res.send(staff);
    });
  },
  getById: (req, res) => {
    Staff.getById(req.params.id, function (err, staff) {
      if (err) res.send(err);
      res.send(staff);
    });
  },
  updateStaff: (req, res) => {},
  deleteStaff: (req, res) => {},
};

module.exports = staffController;
