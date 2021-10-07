const express = require('express');
var bodyParser = require("body-parser");
const app = express();
const cors = require('cors');
const multer  = require("multer");
const mysql =require("mysql2")

let products =[];

const connection =mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "orchids",
    password: "123"
});



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cors());
app.options('*', cors());

app.use(express.static('static'));



 app.get('/fetch', function (req,res)
{
    connection.connect (function (err){
        if(err){
            return console.error("Oшибка" + err.message );
        }
        else{
            console.log('Подключение к mysql успешно установленно!')
        }
    })
    connection.query("SELECT * FROM orchid",
       function  (err, results,fields){

           if(err){


               return  console.error(err);
           }
           else {



               console.log(products);
               console.log(results);
                return products=results;

           }
       });

    connection.end(function (err){
        if(err){
            console.error("Oшибка" + err.message )
        }
        else {
            console.log('Подключение закрыто')
        }
    })
    console.log(products)

    if(products!==[]) {
        console.log('console','все пошло так');
        res.send(products);
    }
    else {
        res.send('что-то пошло не так');
        console.log('что-то пошло не так');
    }

  }
   )


app.listen(3008, console.log('work in port:3008'));