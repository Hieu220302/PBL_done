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
  dbConn.query(`SELECT * FROM Staff WHERE id_User= ${id}`, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

Staff.changeFreeTime = function (result, props) {
  const { id, Free_time } = props.body;
  const sql = `UPDATE Staff  SET Free_time =? WHERE id = ?`;
  const values = [Free_time, id];

  dbConn.query(sql, values, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

Staff.changeRegistrationTime = function (result, props) {
  const { id, Free_time, Registration_Time } = props.body;
  const sql = `UPDATE Staff  SET Free_time =? , Registration_Time=? WHERE id = ?`;
  const values = [Free_time, Registration_Time, id];

  dbConn.query(sql, values, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Staff;
