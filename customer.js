var express = require('express');
var app = express();
var fs = require("fs");
const mysql = require('mysql');
const bodyParser = require('body-parser');

app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use(bodyParser.json())

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'vasu'
  });

app.get('/getCustomers', function (req, res) {
    connection.query('SELECT * FROM customers', (err,rows) => {
        if(err) throw err;
        console.log(rows);
        //res.end( JSON.stringify(rows) );
        res.json(rows);
    });
})

app.post('/addCustomer', function (req, res) {
  var cname = req.body.name;
  var cage = req.body.age;
  var csal = req.body.sal;
  var caddress = req.body.address;
  var cqualification = req.body.qualification;
  var cis_married = req.body.is_married;
  var cgender = req.body.gender;

    connection.query('INSERT INTO customers SET ?', {name:cname,age:cage,sal:csal,address:caddress,qualification:cqualification,is_married:cis_married,gender:cgender}, (err, res) => {
        if(err) throw err;
        else console.log("Row is inserted...");
      });
 })

 app.put('/updateCustomer', function (req, res) {
  var customer_id = req.body.customer_id;
  var cname = req.body.name;
  var cage = req.body.age;
  var csal = req.body.sal;
  var caddress = req.body.address;
  var cqualification = req.body.qualification;
  var cis_married = req.body.is_married;
  var cgender = req.body.gender;

    var sql ="UPDATE customers SET name=?, age=?, sal=?, address=?, qualification=?, is_married=?, gender=? WHERE customer_id=?";
    connection.query(sql, [cname, cage, csal, caddress, cqualification, cis_married, cgender, customer_id], (err, res) => {
        if(err) throw err;
        else console.log("Row is updated...");
      });
 })

 app.delete('/deleteCustomer', function (req, res) {
    var customer_id = req.body.customer_id;
    var sql ="DELETE from customers WHERE customer_id=?";
    connection.query(sql, customer_id, (err, res) => {
        if(err) throw err;
        else console.log("Row is deleted...");
        //res.send("Row is deleted...");
      });
 })

var server = app.listen(8081, function () {
   var host = "localhost"
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})