var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var mongoose = require('mongoose')


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.render('pages/index');
});

app.get('/profile', function(req, res){
    res.render('pages/profile')
})
app.listen(8080, ()=>console.log("listening"));