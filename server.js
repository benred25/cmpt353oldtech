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

app.get('/select', (req, res) => {

    var sql = 'SELECT * FROM menu';
    con.query(sql, function (err, result, fields) {
      if (err) throw err;

      res.json(result);
    });
    
});

app.use('/', express.static('pages'));
   
app.listen(PORT, HOST);

console.log('up and running');
