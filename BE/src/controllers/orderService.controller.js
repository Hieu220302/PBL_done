"use strict";
const orderService = require("../models/orderService.model");

const orderServiceController = {
  getAll: (req, res) => {
    orderService.getAll(function (err, orderService) {
      if (err) res.send(err);
      res.send(orderService);
    });
  },
  getAllState: (req, res) => {
    orderService.getAllState(function (err, orderService) {
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
  getByIdGroupService: (req, res) => {
    orderService.getByIdGroupService(function (err, orderService) {
      if (err) res.send(err);
      res.send(orderService);
    }, req);
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
  cancelStaff: (req, res) => {
    orderService.cancelStaff(function (err, orderService) {
      if (err) res.send(err);
      res.send(orderService);
    }, req);
  },
  changeCompletedOrder: (req, res) => {
    orderService.changeCompletedOrder(function (err, orderService) {
      if (err) res.send(err);
      res.send(orderService);
    }, req);
  },

  getByIdStaff: (req, res) => {
    orderService.getByIdStaff(req.params.id, function (err, orderService) {
      if (err) res.send(err);
      res.send(orderService);
    });
  },
  changeOrderByStaff: (req, res) => {
    orderService.changeOrderByStaff(function (err, orderService) {
      if (err) res.send(err);
      res.send(orderService);
    }, req);
  },
  deleteUsers: (req, res) => {},
};

module.exports = orderServiceController;
