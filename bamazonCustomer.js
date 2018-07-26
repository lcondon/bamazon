const inquirer = require('inquirer');
const mysql = require('mysql');
const table = require('console.table');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: 'root',
    password: 'march2195',
    database: 'bamazon'
});

connection.connect(function (err) {
    if (err) {
        console.log("error");
        throw err;
    };
    if (!err) {
        connection.query(`SELECT * FROM products`, function (err, res) {
            if (err) {
                throw err;
            }
            var table = res;
            var productArray = [];
            for (var i = 0; i < table.length; i++) {
                productArray.push({
                    ID: table[i].id,
                    Product: table[i].product_name,
                    Price: `$${table[i].price}`
                })
            };
            console.log("");
            console.table(productArray);
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'product',
                    message: 'Please enter the ID of the item you would like to buy',
                },
                {
                    type: 'input',
                    name: 'quantity',
                    message: 'How many would you like to buy?'
                }
            ]).then(function (answer) {
                if (err) {
                    throw err;
                    connection.end();
                    return;
                }
                var a = answer.quantity;
                connection.query(`SELECT * FROM products WHERE ?`, { id: answer.product }, function (err, res) {
                    if (err) {
                        throw err;
                        connection.end();
                        return;
                    };
                    if (!err) {
                        var q = res[0].stock_quantity;
                        var product = res[0].product_name;
                        if (q > a) {
                            connection.query(
                                "UPDATE products SET ? WHERE ?",
                                [{
                                    stock_quantity: q - a
                                },
                                {
                                    id: res[0].id
                                }],
                                function (err, reso) {
                                    if (err) {
                                        console.log("bad code");
                                        return;
                                    }
                                    if (!err) {
                                        console.log(`You bought ${a} ${product} for a total of $${res[0].price * a}`);

                                    }
                                }
                            );
                            connection.end();
                        } else {
                            console.log("Insufficient quantity!");
                            connection.end();
                        }
                    }
                });

            });
        });
    };
});