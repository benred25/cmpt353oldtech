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
    res.send('hello world from root!');
    console.log('from root')
});

app.get('/create', (req, res) => {

    var sql = "CREATE TABLE menu (item VARCHAR(50), price FLOAT)";

    con.query(sql, function (err, result) {
        if (err) throw err;
    });

    res.send("table created");
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
})

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


app.use('/', express.static('pages'));
   
app.listen(PORT, HOST);

console.log('up and running');
