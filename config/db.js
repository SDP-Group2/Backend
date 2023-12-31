const mysql = require('mysql2')
const dotenv = require('dotenv')

dotenv.config({ path: './config/.env' });

const {  MYSQL_USERNAME,
    MYSQL_PASSWORD,
    MYSQL_HOSTNAME,
    MYSQL_DB } = process.env;


const db = mysql.createConnection({
    host: MYSQL_HOSTNAME,
    user: MYSQL_USERNAME,
    password: MYSQL_PASSWORD,
    database: MYSQL_DB
})




module.exports = db;