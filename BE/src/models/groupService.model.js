"use strict";
var dbConn = require("../../config/db.config");

var GroupService = function (groupService) {
  this.id = groupService.id;
  this.Name = groupService.Name;
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
