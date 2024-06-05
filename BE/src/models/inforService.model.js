"use strict";
var dbConn = require("../../config/db.config");

var InforService = function (inforService) {
  this.id = inforService.id;
  this.id_group = inforService.id_group;
  this.Type = inforService.Type;
  this.Detail = inforService.Detail;
  this.hasQuantity = inforService.hasQuantity;
  this.hasTime = inforService.hasTime;
  this.isServicePacks = inforService.isServicePacks;
  this.Price = inforService.Price;
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
