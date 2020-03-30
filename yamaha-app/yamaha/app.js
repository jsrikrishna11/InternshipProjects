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

//Server setting
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Basic Routes
app.get('/', function(req, res){
    res.render('pages/index');
});

app.get('/save', function(req, res){
    res.send("Saved!")
})

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

app.get("/askme", function(req, res){
    res.render('pages/askme');
});


//DB access
app.get('/db', function(req, res){
    connection(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        request.query('select * from insurance', function (err, recordset) {
            
            if (err) console.log(err)
            res.send(recordset);
            
        });
    });
});

app.get('/existing', function(req, res){
    connection(config, function (err) {
        if (err) console.log(err);
        let statement="select policyID from insurance where county = \'UNION COUNTY\';"
        var request = new sql.Request();   
        request.query(statement, function (err, recordset) {
            if (err) console.log(err)
            console.log("Query!")
            let result = []
            for(i in recordset["recordsets"][0]){
                console.log(i)
                console.log(recordset["recordsets"][0][i])
            }
            res.render('pages/dealers',{'selected':['policyID'],'data':recordset["recordsets"][0]});
    });
    })
})

app.post('/query', function(req, res){
    console.log(req.body);
    const column = req.body['field'];
    let value = req.body['criteria'];
    let selection = req.body['selection']
    console.log(selection)
    console.log(column)
    connection(config, function (err) {
        if (err) console.log(err);
        let statement="";
        var request = new sql.Request();
        if(column=='county'|| column=='statecode' || column == "line"){
            value = "\'"+value+"\'" 
        }
        statement = 'select '+selection.join(',')+' from insurance where '+column+"="+value;    
        request.query(statement, function (err, recordset) {
            if (err) res.send("NO SUCH RECORD FOUND!")
            res.render("pages/queryResult",{"selected": selection,"records":recordset["recordsets"][0]});
    });
});
})


app.listen(8080, ()=>console.log("listening"));