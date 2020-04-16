var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var sql = require("mssql");
var rn = require('random-number');
var options = {
    min:  0
  , max:  1000
  , integer: true
  }
//SQL server config
var config = {
    user: 'sa',
    password: '1234',
    server: 'localhost', 
    database: 'Test' ,
    port: 1433
};
var connection = sql.connect

//Server settings
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







//Insert Operation
app.post('/save', function(req, res){
    console.log(req.body)
    connection(config, function(err){
        if(err) console.log(err)
        var request = new sql.Request();
        var eID = rn(options);
        var columns = [];
        var values = []
        columns.push('employeeID')
        values.push(eID)
        for (key in req.body){
            var value;
            if(key=="eName" || key =="role"){
              value = "\'"+req.body[key]+"\'"  
            }
            else{
                value = parseInt(req.body[key])
            }
            columns.push(key)
            values.push(value)
        }
        console.log(columns+"   "+values)
        var statement = 'insert into Test.dbo.employee ('+ columns+') values('+values+');'
        // var statement = "insert into Test.dbo.emp (employeeID, eName, age, salary) VALUES (122, \'Krishna\', 12, 1000)"
        request.query(statement, function(err, records){
            if(err) res.send(err)
            res.send("Thanks!")
        })
    })
})

app.get("/askme", function(req, res){
    res.render('pages/askme');
});

//Read Operation
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
//Dynamic Read operation
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



//Update Operation
    //Getting details of desired candidate.
app.get('/edit', function(req, res){
    res.render('pages/entername');
})
    //Displaying details and allowing user to edit attributes
app.post('/details', function(req,res){
    for(i in req.body){
        if(i == 'eName'){
            req.body[i] = "\'%"+req.body[i]+"%\'";
        }
        if( i== 'employeeID'){
            req.body[i] = parseInt(req.body[i]);
        }
    }
    var statement = "select employeeID, eName from Test.dbo.employee where eName like "+ req.body['eName'];
    console.log(statement)
    getRecords(statement, res, "pages/update");
    
});

    //Acknowledgement message and final result.
app.post('/change', function(req, res){
    console.log(req.body);
    var id = req.body['employeeID'];
    var statement = "select pay_year, salary from dbo.salaries where employeeID = "+ parseInt(id)+";";
    var page = "pages/output"
    getRecords(statement, res, page);
    
});

function getRecords(statement, res, page){
    connection(config, function(err){
        if (err) res.send(err)
        var request = new sql.Request();
        request.query(statement, function(err, recordset){
            if(err) res.send(err)
            if(recordset['recordsets']){
                var keys = Object.keys(recordset['recordsets'][0][0]);
                res.render(page, {'data':recordset['recordsets'][0] , 'keys':keys})
            }
        })
    })
}

// Search box typeahead functionality
app.get('/find', function(req, res){
    res.render('pages/search');
});

app.get('/search', function(req, res){
    res.end("Create model")
});

app.listen(8080, ()=>console.log("listening"));
