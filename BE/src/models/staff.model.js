"use strict";
var dbConn = require("../../config/db.config");

var Staff = function (staff) {
  this.id = staff.id;
  this.id_service = staff.id_service;
  this.id_User = staff.id_User;
  this.Registration_Time = staff.Registration_Time;
  this.Free_time = staff.Free_time;
};

Staff.getAll = function (result) {
  dbConn.query(
    "SELECT s.*, u.*  FROM Users u JOIN Staff s ON s.id_User = u.id",
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

Staff.getAllByCustomer = function (result) {
  dbConn.query(
    "SELECT s.id_User,s.id, u.Name,u.Phone_number  FROM Users u JOIN Staff s ON s.id_User = u.id",
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

Staff.getById = function (id, result) {
  dbConn.query(
    `SELECT s.*, u.* FROM Users u JOIN Staff s ON s.id_User = u.id WHERE s.id= ${id}`,
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

module.exports = Staff;
