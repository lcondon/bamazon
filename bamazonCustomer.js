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

    });



    connection.end();
})