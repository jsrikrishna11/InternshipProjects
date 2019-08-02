var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var nodemailer = require('nodemailer');
 

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.render('pages/index');
});

app.listen(8080, ()=>console.log("listening"));