const mysql = require('mysql'); // mysql for dB interaction
const inquirer = require('inquirer'); // inquirer for prompts
const Table = require('cli-table'); // cli-table for displaying tables 
const colors = require('colors');

// array to hold our items 
let items = [];

// order info vairables
let order = '';
let quantity = '';
let tax = '';
let total = '';

// item object constructer - used to move the products out of the sql response and into an object available higher up
function Item(id, name, price, dept, stock) {
  this.id = id;
  this.name = name;
  this.price = price;
  this.department = dept;
  this.stock = stock;
};

// display products table
displayProducts = function () {
  // instantiate a new table and define properties
  let table = new Table({
    head: ['Item ID', 'Name', 'Price ($)', 'Department', 'In Stock'],
  });

  // loop through the items and push to table array
  for (i = 0; i < items.length; i++) {
    table.push([items[i].id, items[i].name, items[i].price, items[i].department, items[i].stock]);
  }

  // print the table array to the console
  console.log(table.toString());
}

// defining our dB interactions
// defining the query all function
queryAllProducts = function (res, err) {
  console.log("AVAILABLE PRODUCTS".red);
  // creates an item object for each prouct in the response, pushes to an array to use globally, displays table, and calls the produc selection function
  connection.query("SELECT * FROM products", function (err, res) {
    for (var i = 0; i < res.length; i++) {
      let item = new Item(res[i].item_id, res[i].product_name, res[i].price, res[i].department_name, res[i].stock_quantity);
      items.push(item); // adding to items array for inquirer and table
    };
    displayProducts(); // throws all items into a table and logs it to the console
    productSelection(); // calls the inquirer function to select products
  });
}

// defining item stock update function
productUpdate = function () {
  let stockNew = order.stock - quantity;
  connection.query('UPDATE products SET stock_quantity = ? WHERE item_id = ?', [stockNew, order.id]);
  items = [];
}

// defining the continue shopping prompt
shop = function () {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'shop',
        message: 'Would you like to continue shopping?'.green,
        choices: ['Continue', 'Quit']
      }
    ])
    .then(answers => {
      if (answers.shop === 'Continue') {
        console.log('');
        queryAllProducts(); // retrieve all products from db
      } else {
        console.log("----------------------------------------------------------------------");
        console.log('Thanks for shopping Bamazon Prime!  Adios!');
        console.log("----------------------------------------------------------------------\n");
        connection.end();
      }

    });
}

// db connection setup
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "happymarmot",
  database: "bamazon"

});

// connecting to the db and querying the products
connection.connect(function (err) {
  if (err) throw err;
  console.log("\n----------------------------------------------------------------------");
  console.log(("Welcome to Bamazon Prime! You are connected as id " + connection.threadId).red);
  console.log("----------------------------------------------------------------------\n");

  queryAllProducts(); // retrieve all products from db
});

// function to grab user input for product selection
productSelection = function () {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'item',
        message: 'What item would you like to order?'.green,
        choices: function () {
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
        message: 'How many would you like to order?'.green,
        validate: function validateQuanity(name) {
          // prevents null or zero entries
          return name > 0;
        }
      }
    ])
    .then(answers => {
      console.log("----------------------------------------------------------------------");
      const index = items.map(e => e.name).indexOf(answers.item);
      order = items[index]; // sets order to global variable 
      quantity = answers.quantity;
      subtotal = (items[index].price * quantity).toFixed(2); // allow 2 decimal places
      tax = (subtotal * 0.06).toFixed(2); // allow 2 decimal places
      total = (parseFloat(subtotal) + parseFloat(tax)).toFixed(2); // allow 2 decimal places

      // check for quantity
      if (items[index].stock < answers.quantity) {
        console.log(`Oh heck! There are only ${items[index].stock} of ${answers.item} in stock.`);
        console.log('Please revise your order from the products below.')
        console.log("----------------------------------------------------------------------");

        displayProducts();
        console.log("----------------------------------------------------------------------");

        // revise  order if quantity exceeds stock
        productSelection();
      } else {
        console.log('## ORDER SUMMARY ##'.red);
        console.log(`Item: ID# ${order.id} ${order.name} (${order.price}) x ${quantity} = ${subtotal}`);
        console.log(`Plus ${tax} in sales tax.`);
        console.log(`Total Charge for Order: ${total}`);
        console.log("----------------------------------------------------------------------");
        console.log(`Your order is ready to be placed.\n`);
        inquirer
          .prompt([
            {
              type: 'confirm',
              name: 'placeOrder',
              message: 'Place this order?'.green,
            }
          ])
          .then(answers => {
            if (answers.placeOrder === true) {
              console.log("----------------------------------------------------------------------");
              console.log(`Your order for ${quantity} ${order.name} has been placed.\n`);
              // console.log("----------------------------------------------------------------------");
              productUpdate();
              shop();

            } else {
              console.log("----------------------------------------------------------------------");
              console.log('Order cancelled.\n');
              shop();
            }

          });
      }
    });
}

