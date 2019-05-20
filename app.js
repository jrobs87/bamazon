const mysql = require('mysql');
const inquirer = require('inquirer');

console.log("");
console.log("Welcome to Bamazon!")
console.log("----- ----- -----");

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "docker",
    database: "bamazon"
    
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);

    queryAllProducts();
    
  console.log("----- ----- -----");
  });

function queryAllProducts() {
  console.log("AVAILABLE PRODUCTS");
  connection.query("SELECT * FROM products", function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(`${res[i].item_id} - ${res[i].product_name} - ${res[i].price} - ${res[i].department_name} - ${res[i].stock_quantity}`);
    };
    console.log("-----------------------------------");
  });
  connection.end();
}

  // rename to bamazonCustomer.js

  // Create a "Prompt" with a series of questions.
// inquirer
// .prompt([
//   // Here we create a basic text prompt.
//   {
//     type: "input",
//     message: "What is your name?",
//     name: "username"
//   },
//   // Here we create a basic password-protected text prompt.
//   {
//     type: "password",
//     message: "Set your password",
//     name: "password"
//   },
//   // Here we give the user a list to choose from.
//   {
//     type: "list",
//     message: "Which Pokemon do you choose?",
//     choices: ["Bulbasaur", "Squirtle", "Charmander"],
//     name: "pokemon"
//   },
//   // Here we ask the user to confirm.
//   {
//     type: "confirm",
//     message: "Are you sure:",
//     name: "confirm",
//     default: true
//   }
// ])
// .then(function(inquirerResponse) {
//   // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
//   if (inquirerResponse.confirm) {
//     console.log("\nWelcome " + inquirerResponse.username);
//     console.log("Your " + inquirerResponse.pokemon + " is ready for battle!\n");
//   }
//   else {
//     console.log("\nThat's okay " + inquirerResponse.username + ", come again when you are more sure.\n");
//   }
// });