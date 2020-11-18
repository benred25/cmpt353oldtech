'use strict';

const express = require('express');

const PORT = 8080;
const HOST = '0.0.0.0';
const PATH = __dirname + '/pages/';
const app = express();
const bodyParser = require('body-parser');
 
app.use(bodyParser.urlencoded({extended: true}));

const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'shopDataBase',
    user: 'root',
    password: 'admin',
    database: 'coffeeShop'
});
 
app.get('/', (req,res) => {
    var sql1 = "CREATE TABLE menu (id INT NOT NULL AUTO_INCREMENT, item VARCHAR(50), price FLOAT, PRIMARY KEY (id))";

    con.query(sql1, function (err, result) {
        if (err) throw err;
    });

    var sql2 = "CREATE TABLE orders (id INT NOT NULL AUTO_INCREMENT, items VARCHAR(255), price FLOAT, timestamp TIMESTAMP NOT NULL, complete TINYINT(1) DEFAULT 0, PRIMARY KEY (id))";

    con.query(sql2, function (err, result) {
        if (err) throw err;
    });

    console.log('tables created')
    res.sendFile(PATH + 'home.html');
});

app.get('/selectMenu', (req, res) => {

    var sql = 'SELECT * FROM menu';

    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.json(result);
    });

});

app.post('/insertMenu', (req, res) => {
    var item = req.body.item;
    var price = req.body.price;

    var sql = `INSERT INTO menu (item, price) VALUES ('${item}', '${price}')`;

    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("item added to menu");
    });

    res.sendFile(PATH + 'editMenu.html');
});

app.post('/deleteMenu', (req, res) => {
    var id = req.body.id;

    var sql = `DELETE FROM menu WHERE id='${id}'`;

    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("item deleted from menu");
    });

    res.sendFile(PATH + 'editMenu.html');
});

app.get('/selectOrders', (req, res) => {

    var sql = 'SELECT * FROM orders';

    con.query(sql, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});

app.post('/insertOrder', (req, res) => {

    var items = req.body.items;
    var price = req.body.price;
    price = price.substring(1);

    var sql = `INSERT INTO orders (items, price) VALUES ('${items}', '${price}')`;

    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("order insert success");
    });

    res.sendFile(PATH + "menu.html");

});

app.post('/deleteOrder', (req, res) => {
    var id = req.body.id;

    var sql = `DELETE FROM orders WHERE id='${id}'`;

    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("order deleted from orders");
    });

    res.sendFile(PATH + 'status.html');
});

app.post('/completeOrder', (req, res) => {
    var id = req.body.id;

    var sql = `UPDATE orders SET complete = '1' WHERE id = ${id}`

    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("order updated");
    });

    res.sendFile(PATH + "updateStatus.html");
});

app.get('/status', (req, res) => {
    console.log("moving to status.html");
    res.sendFile(PATH + 'status.html');
});

app.get('/menu', (req, res) => {
    console.log("moving to menu.html");
    res.sendFile(PATH + 'menu.html');
});

app.get('/editMenu', (req, res) => {
    console.log("moving to editMenu.html");
    res.sendFile(PATH + 'editMenu.html');
});

app.get('/updateStatus', (req, res) => {
    console.log("moving to updateStatus.html");
    res.sendFile(PATH + 'updateStatus.html');
});

app.get('/home', (req, res) => {
    console.log("moving to home.html");
    res.sendFile(PATH + 'home.html');
});


app.use('/', express.static('pages'));
   
app.listen(PORT, HOST);

console.log('up and running');
