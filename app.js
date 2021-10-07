const express = require('express');
var bodyParser = require("body-parser");
const app = express();
const cors = require('cors');
const multer  = require("multer");
const mysql =require("mysql2")

const storageConfig =multer.diskStorage({
    destination:(req, file, cb) =>{
        cb(null, "uploads");
    },
    filename:(req, file, cb) =>{
        cb(null, file.originalname);
    }
});




app.use(bodyParser.json()); // Configures bodyParser to accept JSON
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cors());
app.options('*', cors());

app.use(express.static('static'));

app.use(multer({storage:storageConfig}).single('file'));
app.post('/upload', function(req, res,next){
    console.log(req.body);
    console.log(req.body.name)

    let nameorch = req.body.name;
    let priceorch =req.body.price;



    const connection =mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "orchids",
        password: "123"
    });
    connection.connect (function (err){
        if(err){
            return console.error("Oшибка" + err.message );
        }
        else{
            console.log('Подключение к mysql успешно установленно!')
        }
    });

    let sql ="INSERT INTO orchid(name, price)" +
        "VALUES(?, ?)";
    let addsql =[nameorch, priceorch]
    connection.query(sql,addsql, function (err,result){
        if(err) console.log(err);
        else console.log("Данные добавлены")
    } );
    connection.query("SELECT * FROM orchid",
        function (err, results,fields){
            if(err){
                return  console.error(err);
            }
            else {
                console.log(results);
                // console.log(fields);
            }
        });
    connection.end(function (err){
        if(err){
            console.error("Oшибка" + err.message )
        }
        else {
            console.log('Подключение закрыто')
        }
    });


    let filedata = req.file;
    console.log('Filedata',filedata);
    if(!filedata)
        res.send("Ошибка при загрузке файла");
    else
        res.send("Файл загружен");
});
app.listen(3000, console.log('work in port:3000'));

