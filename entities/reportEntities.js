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

const updateReport = (reportData, callback) => {
  db.query( `update ${TABLE_2} set status= "1" where id_report = ?`,[reportData], callback);
};

const updateReport_wait = (reportData, callback) => {
  db.query( `update ${TABLE_2} set status= "2" where id_report = ?`,[reportData], callback);
};

const deleteReport = (reportData, callback) => {
  db.query(`DELETE FROM ${TABLE_2} WHERE id_report = ?`, [reportData], callback);
};

module.exports = {
  createReport,
  getAllReport,
  updateReport,
  deleteReport,
  updateReport_wait
}