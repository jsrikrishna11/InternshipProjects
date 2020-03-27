var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/gfg', {useNewUrlParser: true,  useUnifiedTopology: true}); 
var db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){ 
    console.log("connection succeeded"); 
}) 

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
app.get('/register', function(req, res){
    res.render('pages/dealerRequest')
})

app.post('/save', function(req, res){
    console.log(req.body)
    res.send("Thank you!")
})
app.listen(8080, ()=>console.log("listening"));