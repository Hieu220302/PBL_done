"use strict";
const orderService = require("../models/orderService.model");

const orderServiceController = {
  getAll: (req, res) => {
    orderService.getAll(function (err, orderService) {
      if (err) res.send(err);
      res.send(orderService);
    });
  },
  getById: (req, res) => {},
  postOrder: (req, res) => {
    orderService.postOrder(function (err, orderService) {
      if (err) res.send(err);
      res.send(orderService);
    }, req);
  },
  updateUsers: (req, res) => {},
  deleteUsers: (req, res) => {},
};

module.exports = orderServiceController;
