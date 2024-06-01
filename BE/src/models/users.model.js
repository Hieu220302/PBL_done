"use strict";
var dbConn = require("../../config/db.config");

var Users = function (users) {
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

Users.getAll = function (result) {
  dbConn.query("Select * from Users", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

Users.getById = function (id, result) {
  dbConn.query(`Select * from Users WHERE id=${id}`, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

Users.checkAuth = function (userName, password, result) {
  dbConn.query(
    `SELECT * FROM Users WHERE Username COLLATE utf8_bin = '${userName}' AND Password COLLATE utf8_bin = '${password}'`,
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

module.exports = Users;
