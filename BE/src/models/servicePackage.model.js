"use strict";
var dbConn = require("../../config/db.config");

var servicePackage = function (servicePackage) {
  this.id = servicePackage.id;
  this.Name = servicePackage.Name;
};

servicePackage.getAll = function (result) {
  dbConn.query("Select * from Service_package", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = servicePackage;
