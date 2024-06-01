"use strict";
var dbConn = require("../../config/db.config");

var orderService = function (orderService) {
  this.id = orderService.id;
  this.id_user = orderService.id_user;
  this.address = orderService.Address;
  this.time = orderService.time;
  this.duration = orderService.Duration;
  this.quantity = orderService.Quantity;
  this.id_service = orderService.id_service;
  this.state = orderService.State;
  this.notes = orderService.Notes;
  this.total = orderService.Total;
};

orderService.getAll = function (result) {
  dbConn.query("Select * from Service_order", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

orderService.getByIdUser = function (id, result) {
  dbConn.query(
    `Select * from Service_order WHERE id_user=${id}`,
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

orderService.postOrder = function (result, props) {
  const {
    id_user,
    Address,
    Time,
    Duration,
    Quantity,
    id_service,
    State,
    Notes,
    Total,
  } = props.body;
  const sql = `
        INSERT INTO Service_order (id_user, Address, Time, Duration, Quantity, id_service, State, Notes, Total)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
  const values = [
    id_user,
    Address,
    Time,
    Duration,
    Quantity,
    id_service,
    State,
    Notes,
    Total,
  ];

  dbConn.query(sql, values, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = orderService;
