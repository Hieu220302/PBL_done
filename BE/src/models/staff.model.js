"use strict";
var dbConn = require("../../config/db.config");

var Staff = function (users) {
  this.id = users.id;
  this.Name = users.Name;
  this.DOB = users.DOB;
  this.CIC = users.CIC;
  this.Address = users.Address;
  this.Phone_number = users.Phone_number;
  this.Email = users.Email;
  this.Image = users.Image;
  this.Id_role = users.Id_role;
  this.Username = users.Username;
  this.Password = users.Password;
  this.Created_at = users.Created_at;
  this.Updated_at = users.Updated_at;
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
