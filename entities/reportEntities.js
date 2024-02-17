const db = require('../config/db');
const { TABLE_2 } = process.env;

db.connect()

const createReport = (ReportData, callback) => {
  const { id_customer, location ,Report} = ReportData;
  db.query(`INSERT INTO ${TABLE_2} (id_customer, location, report) VALUES (?, ? ,?)`, [id_customer, location,Report], callback);
};


module.exports = {
  createReport,
}