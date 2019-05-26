# Bamazon Prime

Node CLI app mimicking an order placement to the Bamazon Prime service.  Users can see the products available for order, select a product, place their order, and then see the updated products available.  

## Getting Started

Clone the repo and run NPM install.  You will also need to have an instance of mySQL running and configure the mysql module connection in the bamazonCustomer.js file so that it points to your database.

### Prerequisites

You will need the latest version of node and npm.  You will also need to spin up a mySQL server.


### Installing

Once you have cloned the repo, run npm install to include the inquirer, cli-table, and mysql modules in the app.

After setting up your instance of mysql, configure the following in the bamazonCustomer.js file:

var connection = mysql.createConnection({
  host: "your host",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "user",

  // Your password
  password: "password",
  database: "database"

});

Run the seed.sql file in your dB interface (mySQL Workbench or TablePlue are both good tools for this).  With your new data, run bamazonCustomer.js from the command line, select a product, confirm the order, and select 'Continue' when prompted.

This will re-run the query to show all products - your most recent order will be reflected in the decreased stock/quantity in the new data pulled from the db.

## Running the tests

No tests are currently included.  

### Break down into end to end tests

N/A

### And coding style tests

N/A

## Deployment

This is only intended to be run locally as an exercise in mysql db interaction in the node runtime.

## Built With

* [inquirer.js](https://www.npmjs.com/package/inquirer) - npm package for prompts and capturing user input
* [mysql.js](https://www.npmjs.com/package/mysql) - npm package for working with mysql database
* [cli-table](https://www.npmjs.com/package/cli-table) - npm package for displaying data in table in cli

## Contributing

Send me a PR for contribution.

## Versioning

v1.0 + minor fixes  

## Authors

* **John Robertson** - *Initial work* - [jr.web](https://jrobs87.github.io/portfolio-v3.0/#home)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Shoutout to Jennifer for the table npm package!

