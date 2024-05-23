"use strict";
var dbConn = require("../../config/db.config");

var InforService = function (users) {
  this.id = users.id;
  this.Name = users.Name;
};

InforService.getAll = function (result) {
  dbConn.query("Select * from Information_service", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = InforService;
