"use strict";
var dbConn = require("../../config/db.config");

var orderService = function (orderService) {
  this.id = orderService.id;
  this.id_user = orderService.id_user;
  this.id_staff = orderService.id_staff;
  this.address = orderService.Address;
  this.time = orderService.Time;
  this.duration = orderService.Duration;
  this.quantity = orderService.Quantity;
  this.id_service = orderService.id_service;
  this.state = orderService.State;
  this.notes = orderService.Notes;
  this.total = orderService.Total;
  this.isServicePacks = orderService.isServicePacks;
  this.code = orderService.code;
  this.days = orderService.days;
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

orderService.getByIdStaff = function (id, result) {
  dbConn.query(
    `SELECT s.id,s.id_User,u.* 
    FROM Staff s JOIN Service_order u ON s.id = u.id_staff
        WHERE s.id_User = ${id} AND Time >= NOW()
        ORDER BY Time ASC;`,
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
    isServicePacks,
    code,
    days,
  } = props.body;
  const sql = `
        INSERT INTO Service_order (id_user, Address, Time, Duration, Quantity, id_service, State, Notes, Total,isServicePacks,code,days)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?)
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
    isServicePacks,
    code,
    days,
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

orderService.changeStateOrder = function (result, props) {
  const { id, State, days } = props.body;
  const sql = `UPDATE Service_order SET State = ?,days= ? WHERE id = ?`;
  const values = [State, days, id];

  dbConn.query(sql, values, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

orderService.changeOrderByStaff = function (result, props) {
  const { id, State, id_staff } = props.body;
  const sql = `UPDATE Service_order SET State = ?,id_staff=? WHERE id = ?`;
  const values = [State, id_staff, id];

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
