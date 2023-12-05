var mysql=require("mysql");
var con=mysql.createConnection({
    host:'127.0.0.1',
    database:'hostelb',
    user:'root',
    password:''

});

module.exports=con;