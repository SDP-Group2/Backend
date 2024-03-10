const db = require('../config/db');
const { TABLE_2 } = process.env;

db.connect()

const getAllReport = (callback) => {
  db.query(`SELECT * FROM ${TABLE_2}`, callback);
};

const createReport = (reportData, callback) => {
  const {  location ,report,file} = reportData;
  console.log( location,report,file)
  db.query(`INSERT INTO ${TABLE_2} (location, report,filePath) VALUES (?, ?,?)`, [location,report,file], callback);
};


module.exports = {
  createReport,
  getAllReport
}