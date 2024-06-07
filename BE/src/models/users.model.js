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
  this.isSignUpStaff = users.isSignUpStaff;
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

Users.signUpStaff = function (result, props) {
  const { id_service, id } = props.body;
  const query = `UPDATE Users  SET isSignUpStaff=? WHERE id = ?`;
  const values = [id_service, id];
  dbConn.query(query, values, function (err, res) {
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

Users.updateUser = function (result, props) {
  const { id, Name, DOB, CIC, Address, Phone_number, Email, Updated_at } =
    props.body;

  const query = `
    UPDATE Users 
    SET 
      Name = ?, 
      DOB = ?, 
      CIC = ?, 
      Address = ?, 
      Phone_number = ?, 
      Email = ?, 
      Updated_at = ?
    WHERE id = ?`;

  const values = [Name, DOB, CIC, Address, Phone_number, Email, Updated_at, id];

  dbConn.query(query, values, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

Users.getAllByStaff = function (result) {
  dbConn.query(
    "   SELECT s.id_user,s.id, u.Name,u.Phone_number  FROM Users u JOIN Service_order s ON s.id_user = u.id",
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

Users.checkUsername = function (result, props) {
  const { Username } = props.body;
  dbConn.query(
    `SELECT Username FROM Users Where Username ='${Username}'`,
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

Users.signUpUser = function (result, props) {
  const { Name, DOB, CIC, Address, Phone_number, Email, Username, Password } =
    props.body;

  const query = `
        INSERT INTO Users ( Name, DOB,CIC ,Address ,Phone_number ,Email ,
        Id_role ,Username ,Password,  Created_at,Updated_at )
        VALUES (?,?,?, ?, ?, ?,2,?,?,now(),now())`;

  const values = [
    Name,
    DOB,
    CIC,
    Address,
    Phone_number,
    Email,
    Username,
    Password,
  ];

  dbConn.query(query, values, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Users;
