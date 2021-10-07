const mysql =require("mysql2")


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
let sql ="INSERT INTO orchid(name, price)" +
    "VALUES(?, ?)";
let addsql =[{nameorch}, {priceorch}]
connection.query(sql,addsql, function (err,result){
    if(err) console.log(err);
    else console.log("Данные добавлены")
} )
connection.end(function (err){
    if(err){
        console.error("Oшибка" + err.message )
    }
    else {
        console.log('Подключение закрыто')
    }
});
