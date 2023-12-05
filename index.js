var express=require("express");
var app= express();
var bodyParser=require('body-parser');
const session=require("express-session");
const cookieParser=require("cookie-parser");


app.set("view engine", "ejs");

app.use(cookieParser());
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:"secret"
})
);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var con=require("./database");

const http = require('http');
const fs = require('fs');

const home = fs.readFileSync('./public/index.html');
const loginPage = fs.readFileSync('./public/login.html');
const registerPage=fs.readFileSync('./public/register.html');
const foodD=fs.readFileSync('./public/foodD.html');
const foodR=fs.readFileSync('./public/foodR.html');
const medicineD=fs.readFileSync('./public/medicineD.html');
const medicineR=fs.readFileSync('./public/medicineR.html')
const otherR=fs.readFileSync('./public/otherR.html');
const otherD=fs.readFileSync('./public/otherD.html');
// const   Show=fs.readFileSync('./Show.ejs');

const server = http.createServer((req, res)=>{
    url = req.url;

    res.statusCode = 200;
    res.setHeader('content-Type', 'text/html');
    if(url=='/'){
        res.end(home);
    }
    else if (url == '/login'){
        res.end(loginPage);
    }
    else if(url== '/register'){
        res.end(registerPage)
    }
    else if(url=='/foodD'){
        res.end(foodD)
    }
    else if(url=='/foodR')
    {
        res.end(foodR);
    }
    else if(url=='/medicineD')
    {
        res.end(medicineD);
    }
    else if(url=='/medicineR')
    {
        res.end(medicineR)
    }
    else if(url=='/otherD')
    {
        res.end(otherD)
    }
    else if(url=='/otherR')
    {
        res.end(otherR)
    }
    // else if(url=='/Show')
    // {
    //     res.end(Show)
    // }
   

});




const path = require('path');
app.use(express.static(path.join(__dirname,'public')));



con.connect(function(err){
    if(err) throw err


app.post('/register.html', function(req,res){
    var userid=req.body.userR;
    var phone=req.body.phoneR;
    var password=req.body.passwordR;

    var sql="INSERT INTO login(userID,phoneNo,password) VALUES('"+userid+"','"+phone+"','"+password+"')";
    con.query(sql,function(error,result){
        if(error) throw error;

        res.sendFile(path.join(__dirname+'/public/regSuccess.html'));

    });
});

var userID;
var password;
 app.post('/login.html',function(req,res){
    userID=req.body.userL;
    password=req.body.passwordL;

    con.query("select * from login where userID = ? and password = ?",[userID,password],function(error,result){
        if(result.length>0)
        {
            req.session.user=userID;
            req.session.save();
            res.sendFile(path.join(__dirname+'/public/index1.html'));
        }
        else
        res.sendFile(path.join(__dirname+'/public/index.html'));
    });
});





app.post('/medicineD.html',function(req,res){
    // console.log(req)
    var item=req.body.item;

    // con.connect(function(error){
        //  if(error) throw error;

        var sql="INSERT INTO medicine(userID,item) VALUES('"+userID+"','"+item+"')";
        con.query(sql,function(error, result){
            if(error) throw error; 

            res.sendFile(path.join(__dirname+'/public/last.html'));
        } );
    });
//  });



 app.post('/foodD.html',function(req,res){
    // console.log(req)
    var item=req.body.item;

    // con.connect(function(error){
        //  if(error) throw error;

        var sql="INSERT INTO food(userID,item) VALUES('"+userID+"','"+item+"')";
        con.query(sql,function(error, result){
            if(error) throw error; 

            res.sendFile(path.join(__dirname+'/public/last.html'));
        } );
    });
//  });



 app.post('/otherD.html',function(req,res){
    var item=req.body.item;

    // con.connect(function(error){
        //  if(error) throw error;

        var sql="INSERT INTO other(userID,item) VALUES('"+userID+"','"+item+"')";
        con.query(sql,function(error, result){
            if(error) throw error; 

            res.sendFile(path.join(__dirname+'/public/last.html'));
        } );
    });
//  });

 




app.post('/medicineR.html', function(req,res){
    var item=req.body.item;

    // con.connect(function(error){
        // if(error) throw error;

        // var sql="SELECT * from medicine where item = ('"+item+"')";

        con.query("SELECT * from medicine m,login l where item = ? and m.userID=l.userID", [item] , function(error,result){
            // if(error) console.log(error);
            
            if(result.length>0)
            res.render("Show",{have:result});
            else
            res.sendFile(path.join(__dirname+'/public/index.html'));
        });
    });
// });



app.post('/foodR.html', function(req,res){
    var item=req.body.item;

    // con.connect(function(error){
        // if(error) throw error;

        var sql="SELECT * from food where item LIKE '%"+item+"%'";

        con.query("SELECT * from food f,login l where item = ? and f.userID=l.userID", [item] , function(error,result){
            // if(error) console.log(error);

            if(result.length>0)
            res.render("Show",{have:result});
            else
            res.sendFile(path.join(__dirname+'/public/index.html'));
        });
    });
// });



app.post('/otherR.html', function(req,res){
    var item=req.body.item;

    // con.connect(function(error){
        // if(error) throw error;

        var sql="SELECT * from other where item LIKE '%"+item+"%'";

        con.query("SELECT * from other o,login l where item = ? and o.userID=l.userID", [item] , function(error,result){
            // if(error) console.log(error);

            if(result.length>0)
            res.render("Show",{have:result});
            else
            res.sendFile(path.join(__dirname+'/public/index.html'));
        });
    });
// });


});





app.listen(3000,function(){
    console.log("App is running");
});

