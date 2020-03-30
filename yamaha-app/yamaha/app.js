var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var sql = require("mssql");

//SQL server config
var config = {
    user: 'sa',
    password: '1234',
    server: 'localhost', 
    database: 'Test' ,
    port: 1433,
};
var connection = sql.connect

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
app.get('/db', function(req, res){
    
   
    // connect to your database
    connection(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
            
        // query to the database and get the records
        request.query('select * from insurance', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            
        });
    });
});
app.get('/existing', function(req, res){
    var dbo = db.useDb(DATABASE);
    dbo.collection(mycollection).find().limit(10).toArray(function(err, result){
        if(err) throw err;
        res.render('pages/dealers', { jsonData : result});
    });
})

app.get("/askme", function(req, res){
    res.render('pages/askme');
});

app.post('/query', function(req, res){
    console.log(req.body);
    const column = req.body['field'];
    let value = req.body['criteria'];
    console.log(column)
    connection(config, function (err) {

        if (err) console.log(err);
        // create Request object
        let statement="";
        let selector = "";
        var request = new sql.Request();
        if(column=='county'|| column=='statecode' || column == "line"){
            value = "\'"+value+"\'" 
        }
        statement = 'select * from insurance where '+column+"="+value;    
        // query to the database and get the records
        request.query(statement, function (err, recordset) {
            if (err) console.log(err)
        // send records as a response
            res.render(recordset["recordsets"]);
    });
});
})
app.listen(8080, ()=>console.log("listening"));