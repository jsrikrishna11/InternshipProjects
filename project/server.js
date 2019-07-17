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
    console.log("GET REQUEST ------ INDEX");
    res.render('pages/index');
});

app.get('/contact', function(req, res){
    res.render('pages/contact', {"responseCode" : -1,"responseDesc" : "Sucess"});
});

app.post('/contact', function(req, res){
    console.log("posted to server-----------");
    // g-recaptcha-response is the key that browser will generate upon form submit.
    // if its blank or null means user has not selected the captcha, so return the error.
    if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
     return res.json({"responseCode" : 1,"responseDesc" : "Please select captcha"});
    }
  // Put your secret key here.
    var secretKey = "6LeaKK4UAAAAAC4RobcEpY3OAT-UJx0yI05mEkWP";
  // req.connection.remoteAddress will provide IP address of connected user.
    console.log(req.body['g-recaptcha-response']);
    console.log('----------------------------------------------\n')
    console.log(req.connection.remoteAddress);
    var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
  // Hitting GET request to the URL, Google will respond with success or error scenario.
    request(verificationUrl,function(error,response,body) {
        body = JSON.parse(body);
    // Success will be true or false depending upon captcha validation.
        if(body.success !== undefined && !body.success) {
        return res.json({"responseCode" : 1,"responseDesc" : "Failed captcha verification"});
    }
    res.render('pages/contact',{"responseCode" : 0,"responseDesc" : "Sucess"});
  });
});


app.listen(8080, ()=> console.log("listening!!!"));

