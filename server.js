const express = require("express")
const path = require('path')
const mysql = require('mysql2')
const dotenv = require('dotenv')

const swaggerUi = require('swagger-ui-express')
const fs = require('fs')
const yaml = require('yaml')
const file = fs.readFileSync('./swagger.yaml', 'utf8')
const cors = require('cors')
const swaggerDocument = yaml.parse(file)


dotenv.config();

const {MYSQL_USERNAME,MYSQL_PASSWORD,MYSQL_HOSTNAME, MYSQL_DB,MY_PORT,TABLE} = process.env;


const connection = mysql.createConnection({
    host: MYSQL_HOSTNAME,
    user: MYSQL_USERNAME,
    password: MYSQL_PASSWORD,
    database: MYSQL_DB
})

var app = express();

app.use(cors())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(express.json())
app.get('/market/all',(req, res) =>{
    connection.query(
        `SELECT * FROM  ${TABLE}`,function(err, result){
            res.json(result)
        }
    )
})

app.post('/market', (req,res) => {
    const { location, type_shop } = req.body
    connection.query(
        `insert into ${TABLE} (location, type_shop) values(?,?)`,[location,type_shop],
        function(err, result){
            if (err){
                res.status(500).json({ 'status': 'error', 'message': 'Internal Server Error' });
                return;
            }
            else{

                res.json(result)
            }

        }
    )
})

app.put('/market', (req,res) => {
    const {id, location, type_shop } = req.body
    connection.query(
        `update ${TABLE} set location = ?,type_shop =? where id = ?`,[location,type_shop,id],
        function(err, result){
            if (err){
                res.status(500).json({ 'status': 'error', 'message': 'Internal Server Error' });
                return;
            }
            else{

                res.json(result)
            }

        }
    )
})

app.delete('/market/:id', (req,res) => {
    const id = req.params.id
    connection.query(
        `DELETE FROM ${TABLE} WHERE id = ?`, [id],
        function(err, result){
            if (err){
                res.status(500).json({ 'status': 'error', 'message': 'Internal Server Error' });
                return;
            }
            else{

                res.json(result)
            }

        }
    )
})



app.get('/market/:id', (req, res)=>{
    const id = req.params.id;
    connection.query(
        `select * from ${TABLE}  where id=?`,[id],
        function(err,result){

            if (err) {
                res.status(500).json({ 'status': 'error', 'message': 'Internal Server Error' });
                return;
            }
            console.log(result.length)
            if (result.length >= 1){
            res.json(result)
            }
            else{
                res.status(404).json({ 'status': 'ERROR', 'message': 'ID not found' });
            }
        }
    )
})

app.listen(MY_PORT, () =>{
  console.log("Started application on port %d", MY_PORT);
});
