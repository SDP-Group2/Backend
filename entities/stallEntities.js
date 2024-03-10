const db = require('../config/db');
const { TABLE } = process.env;

db.connect()

const getAllStalls = (callback) => {
  db.query(`
      SELECT market.lock_key, market.num, stall.Name_shop, stall.date_start, stall.date_end, stall.type, stall.status,stall.ID_stall
      FROM stall
      LEFT JOIN market ON stall.ID_lock = market.id_lock;
  `, callback);
};
const getStallById = (id, callback) => {
  db.query(`SELECT * FROM ${TABLE} WHERE ID_stall=?`, [id], callback);
};

const createStall = (marketData, callback) => {
  const { Name_shop, path_to_imag_slip, date_start, date_end, type, phone } = marketData;
  db.query(`INSERT INTO ${TABLE} (Name_shop, path_to_imag_slip, date_start, date_end, type, phone) VALUES (?, ?, ?, ?, ?, ?)`, [Name_shop, path_to_imag_slip, date_start, date_end, type, phone], callback);
};


const updateStall = (marketData, callback) => {
  const { status,id } = marketData;
  console.log(location,type_shop)
  db.query( `update ${TABLE} set status where ID_stall = ?`,[status,id], callback);
};

const deleteStall = (marketData, callback) => {
  const {id } = marketData;
  db.query( `DELETE FROM ${TABLE} WHERE ID_stall = ?`, [id], callback);
};


module.exports = {
  getAllStalls,
  getStallById,
  createStall,
  updateStall,
  deleteStall
}