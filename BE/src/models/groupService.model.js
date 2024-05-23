"use strict";
var dbConn = require("../../config/db.config");

var GroupService = function (users) {
  this.id = users.id;
  this.Name = users.Name;
};

GroupService.getAll = function (result) {
  dbConn.query("Select * from Group_service", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = GroupService;
