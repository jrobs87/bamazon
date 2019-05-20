const mysql = require('mysql');
const inquirer = require('inquirer');

console.log('hello world');

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "",
    database: "amazon"
  });

  // rename to bamazonCustomer.js