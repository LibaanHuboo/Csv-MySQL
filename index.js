const mysql = require ("mysql");
const express = require ("express");
const bodyParser = require ("body-parser");
const csvtojson = require('csvtojson');


var app = express();


let con = mysql.createConnection({
    host : "127.0.0.1",
    user : "root",
    password : "",
    database : "Billing_Defaults",
    charset : 'utf8mb4',
    multipleStatements : true,
});

con.connect((err)=>{
    if(!err)
    {
        console.log("Connected");
    }
    else
    {
        console.log(err);
        
    }
});

// con.query("DROP TABLE sample", 
// (err, drop) => {

// // Query to create table "sample"
// var createStatament = 
// "CREATE TABLE sample (Name varchar(255), " +
// "Email varchar(255), Phone int, Status varchar(255))"

// // Creating table "sample"
// con.query(createStatament, (err, drop) => {
//     if (err)
//         console.log("ERROR: ", err);
// });
// });


const fileName = "DHL.csv";
  
csvtojson().fromFile(fileName).then(source => {
  
    // Fetching the data from each row 
    // and inserting to the table "sample"
    for (var i = 0; i < source.length; i++) {
        var         
        Shipping_Service_Code = source[i]["Shipping_Service_Code"],
        Origin_Region = source[i]["Origin_Region"],
        Destination_Region = source[i]["Destination_Region"],
        Container_ID = source[i]["Container_ID"],
        Weight = source[i]["Weight"],
        Description = source[i]["Description"],
        Price = source[i]["Price"],
        Additional_Price_Per_Kilo = source[i]["Additional_Price_Per_Kilo"],
        Currency = source[i]["Currency"],
        Surcharge = source[i]["Surcharge"],
        created_at = source[i]["created_at"],
        updated_at = source[i]["updated_at"]

        var datetime = new Date();
        var insertStatement = 
        `INSERT INTO DHL values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        var items = [Shipping_Service_Code, Origin_Region, Destination_Region, Container_ID, Weight,Description,Price, Currency,Additional_Price_Per_Kilo, Surcharge, new Date, new Date];
  
        // Inserting data of current row
        // into database
        con.query(insertStatement, items, 
            (err, results, fields) => {
            if (err) {
                console.log(
    "Unable to insert item at row ", i + 1);
                return console.log(items);
            }
        });
    }
    console.log(
"All items stored into database successfully");
});

app.listen(3306);
