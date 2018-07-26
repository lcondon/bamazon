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
    }
    if (!err) {
        var actionList = ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product'];
        inquirer.prompt(
            {
                type: 'rawlist',
                name: 'action',
                message: 'What would you like to do?',
                choices: actionList
            }
        ).then(function (answer) {
            switch (answer.action) {
                case actionList[0]:
                    viewProducts();
                    break;
                case actionList[1]:
                    viewLowStock();
                    break;
                case actionList[2]:
                    addStock();
                    break;
                case actionList[3]:
                    addProduct();
                    break;
                default:
                    console.log("I'm not sure what you mean")
                    break;
            }
        });
    };
});

function viewProducts() {
    connection.query(`SELECT * FROM products`, function (err, res) {
        if (err) {
            throw err;
        }
        if (!err) {
            var table = res;
            var productArray = [];
            for (var i = 0; i < table.length; i++) {
                productArray.push({
                    ID: table[i].id,
                    Product: table[i].product_name,
                    Price: `$${table[i].price}`,
                    Stock: table[i].stock_quantity
                })
            };
            console.log("");
            console.table(productArray);
            connection.end();
        }
    });
};

function viewLowStock() {
    connection.query(`SELECT * FROM products`, function (err, res) {
        if (err) {
            throw err;
        };
        if (!err) {
            var table = res;
            var productArray = [];
            for (var i = 0; i < table.length; i++) {
                if (table[i].stock_quantity <= 5) {
                    productArray.push({
                        ID: table[i].id,
                        Product: table[i].product_name,
                        Price: `$${table[i].price}`,
                        Stock: table[i].stock_quantity
                    })
                }
            };
            if (productArray.length > 0) {
                console.log("");
                console.log("-----------Low Inventory----------");
                console.log("");
                console.table(productArray);
                connection.end();
            } else {
                console.log("No items are running low on inventory!");
                connection.end();
            }
        }
    });
};

function addStock() {
    connection.query(`SELECT * FROM products`, function (err, res) {
        if (err) {
            throw err;
            connection.end();
        };
        if (!err) {
            var table = res;
            var productArray = [];
            for (var i = 0; i < table.length; i++) {
                productArray.push({
                    ID: table[i].id,
                    Product: table[i].product_name,
                    Price: `$${table[i].price}`,
                    Stock: table[i].stock_quantity
                })
            };
            console.log("");
            console.table(productArray);
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'product',
                    message: 'Please enter the ID of the product you would to add stock to.'
                },
                {
                    type: 'input',
                    name: 'amount',
                    message: 'How many units would you like to add?'
                }
            ]).then(function (answer) {
                var q;
                var name;
                for (var i = 0; i < res.length; i++) {
                    if (res[i].id == answer.product) {
                        q = res[i].stock_quantity;
                        name = res[i].product_name;
                    }
                }
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [{
                        stock_quantity: parseInt(q) + parseInt(answer.amount)
                    },
                    {
                        id: answer.product
                    }],
                    function (err, reso) {
                        if (err) {
                            console.log("bad code");
                            return;
                        }
                        if (!err) {
                            console.log(`You added ${answer.amount} units to the stock of ${name} for a total of ${parseInt(q) + parseInt(answer.amount)} units`);

                        }
                    }
                );
                connection.end();
            });
        }
    });
}

function addProduct() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the product being added to the inventory?'
        },
        {
            type: 'input',
            name: 'department',
            message: 'What department does the product fall into?'
        },
        {
            type: 'input',
            name: 'price',
            message: 'What is the unit price of the product?'
        },
        {
            type: 'input',
            name: 'stock',
            message: 'How many units would you like to add to the inventory?'
        }
    ]).then(function (answer) {
        connection.query(
            "INSERT INTO products SET ?",
            {
                product_name: answer.name,
                department_name: answer.department,
                price: answer.price,
                stock_quantity: answer.stock
            },
            function (err, res) {
                if (err) {
                    console.log("bad code");
                    return;
                }
                if (!err) {
                    console.log(`You added ${answer.name} to the inventory, with a total of ${answer.stock} units, selling at $${answer.price} per unit`);

                }
                connection.end();
            }
        );
    });
}