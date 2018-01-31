var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err
    console.log("connected as id " + connection.threadId + "\n");

    pullProducts();
});

function pullProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);
        requestItem(res);
    });
}

function requestItem(inventory) {
    // console.log("inventory", inventory);

    inquirer
        .prompt([{
            type: "input",
            name: "choice",
            message: "What is it you are looking for? Search by Id number."
        }])
        .then(function (val) {
            var idCheck = parseInt(val.choice);
            var product = searchInventory(idCheck, inventory);
            // console.log("product:", product);

            if (product) {
                requestQuantity(product);
            } else {
                pullProducts();
            }
        });
}

function requestQuantity(product) {
    inquirer
        .prompt([{
                type: "input",
                name: "quantity",
                message: "How do you want to order?"
            }

        ])

        .then(function (val) {
            var quantity = parseInt(val.quantity);
            // console.log("product quantity:", product.stock_quantity);

            if (quantity > product.stock_quantity) {
                pullProducts();
            } else {
                var newQty = product.stock_quantity - quantity;
                completePurchase(product, newQty);
            }
        });
}

function completePurchase(product, quantity) {
    connection.query(
        "UPDATE products SET stock_quantity = ? WHERE item_id = ?", [quantity, product.item_id],
        function (err, res) {
            // console.log("\nYou purchased " + quantity + " " + product.product_name);
            console.log(`\nYou purchased ${quantity} ${product.product_name}\n`);
            pullProducts();
        }
    );
}

function searchInventory(idCheck, inventory) {
    for (var i = 0; i < inventory.length; i++) {
        if (inventory[i].item_id === idCheck) {
            return inventory[i];
        }
    }
    return null;
}