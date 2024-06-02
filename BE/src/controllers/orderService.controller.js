"use strict";
const orderService = require("../models/orderService.model");

const orderServiceController = {
  getAll: (req, res) => {
    orderService.getAll(function (err, orderService) {
      if (err) res.send(err);
      res.send(orderService);
    });
  },
  getByIdUser: (req, res) => {
    orderService.getByIdUser(req.params.id, function (err, orderService) {
      if (err) res.send(err);
      res.send(orderService);
    });
  },
  postOrder: (req, res) => {
    orderService.postOrder(function (err, orderService) {
      if (err) res.send(err);
      res.send(orderService);
    }, req);
  },
  changeStateOrder: (req, res) => {
    orderService.changeStateOrder(function (err, orderService) {
      if (err) res.send(err);
      res.send(orderService);
    }, req);
  },
  deleteUsers: (req, res) => {},
};

module.exports = orderServiceController;
