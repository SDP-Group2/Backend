const db = require('../config/db');
const { TABLE_2 } = process.env;

db.connect()

const getAllReport = (callback) => {
  db.query(`SELECT * FROM ${TABLE_2}`, callback);
};

const createReport = (reportData, callback) => {
  const {  location ,report,file} = reportData;
  console.log( location,report,file)
  if (location.trim() === '' || report.trim() === '' || file.trim() === '' || location.trim().length > 50 || report.trim().length > 127 ){
    return callback('Invalid input', null);
  }
  else{
  db.query(`INSERT INTO ${TABLE_2} (location, report,filePath) VALUES (?, ?,?)`, [location,report,file], callback);
  }

};


module.exports = {
  createReport,
  getAllReport
}