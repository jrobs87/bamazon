const mysql = require('mysql');
const inquirer = require('inquirer');

// array to hold our items
let items = [];
let order = '';
let quantity = '';
let tax = '';
let total = '';

// item object constructer
function Item(id, name, price, dept, stock) {
  this.id = id;
  this.name = name;
  this.price = price;
  this.department = dept;
  this.stock = stock;
};

console.log("");
console.log("Welcome to Bamazon!")
console.log("----------------------------------------------------------------------");

// db connection setup
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

// connecting to the db and querying the products
connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  console.log("----------------------------------------------------------------------");
  queryAllProducts(); // retrieve all products from db
});

// defining the query all function
function queryAllProducts(res, err) {
  console.log("AVAILABLE PRODUCTS");
  console.log("----------------------------------------------------------------------");
  
  // log out all products to console
  connection.query("SELECT * FROM products", function (err, res) {

    // display the product choices
    for (var i = 0; i < res.length; i++) {
      console.log(`${res[i].item_id} - ${res[i].product_name} - ${res[i].price} - ${res[i].department_name} - ${res[i].stock_quantity}`);

      // creating new item objects
      let item = new Item(res[i].item_id, res[i].product_name, res[i].price, res[i].department_name, res[i].stock_quantity);
      items.push(item); // adding to items array for inquirer
      // console.log(items);
    };

    console.log("----------------------------------------------------------------------");    
    productSelection();
  });

  connection.end(); // terminate connection
}

// function to grab user input for product selection
productSelection = function() {
  inquirer
  .prompt([
    {
      type: 'list',
      name: 'item',
      message: 'What item would you like to order?',
      choices: function() {
        choices = [];
        for (i = 0; i < items.length; i++) {
          choices.push(items[i].name);
        }
        return choices;
      }
    },
    {
      type: 'input',
      name: 'quantity',
      message: 'How many would you like to order?',
      validate: function validateQuanity(name){
        // prevents null or zero entries
        return name > 0;
    }
      }
    
  ])
  .then(answers => {
    console.log("----------------------------------------------------------------------");
    // console.log(`Order: ${answers.quantity} of ${answers.item}`);
    const index = items.map(e => e.name).indexOf(answers.item);
    order = items[index];
    quantity = answers.quantity;
    subtotal = (items[index].price * quantity).toFixed(2);
    tax = (subtotal * 0.06).toFixed(2);
    total = (parseFloat(subtotal) + parseFloat(tax)).toFixed(2);

    // check for quantity
if (items[index].stock < answers.quantity) {
  console.log(`Oh heck! There are only ${items[index].stock} of ${answers.item} in stock.`);
  console.log('Please revise your order from the products below.')
  console.log("----------------------------------------------------------------------");

  // redisplay items
  for (i = 0; i < items.length; i++)  {
  console.log(`Item: ${items[i].name} | Price: $ ${items[i].price} | Department: ${items[i].department} | ${items[i].stock} in stock.`);
  }
  console.log("----------------------------------------------------------------------");

  // revise  order if quantity exceeds stock
  productSelection();
} else {
  console.log('## ORDER SUMMARY ##');
  console.log(`Item: ID# ${order.id} ${order.name} (${order.price}) x ${quantity} = ${subtotal}`);
  console.log(`Plus ${tax} in sales tax.`);
  console.log(`Total Charge for Order: ${total}`);
  console.log("----------------------------------------------------------------------");
  console.log(`Your order is ready to be placed.`);
  inquirer
  .prompt([
    {
      type: 'confirm',
      name: 'placeOrder',
      message: 'Place this order?',
      }
  ])
  .then(answers => {
    if (answers.placeOrder === true) {
      console.log("----------------------------------------------------------------------");
      console.log(`Your order for ${quantity} ${order.name} has been placed.`);
      console.log("----------------------------------------------------------------------");
    }
  });
}
  });
}

productUpdate = function() {

}

