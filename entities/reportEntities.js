const db = require('../config/db');
const { TABLE_2 } = process.env;

db.connect()

const getAllReport = (callback) => {
  db.query(`SELECT * FROM ${TABLE_2}`, callback);
};

const createReport = (reportData, callback) => {
  const {  location ,report} = reportData;
  console.log( location,report)
  db.query(`INSERT INTO ${TABLE_2} (location, report) VALUES (?, ?)`, [location,report], callback);
};


module.exports = {
  createReport,
  getAllReport
}