const db = require('../config/db');
const { TABLE } = process.env;

db.connect()

const getAllStalls = (callback) => {
  db.query(`SELECT * FROM ${TABLE}`, callback);
};

const getStallById = (id, callback) => {
  db.query(`SELECT * FROM ${TABLE} WHERE id_stall=?`, [id], callback);
};

const createStall = (marketData, callback) => {
  const { name,type,phone} = marketData;
  db.query(`INSERT INTO ${TABLE} (Stall_name, Stall_type,Phone) VALUES (?, ?, ?)`, [name,type,phone], callback);
};

const updateStall = (marketData, callback) => {
  const { name,type,phone,id } = marketData;
  console.log(location,type_shop)
  db.query( `update ${TABLE} set Stall_name = ?,Stall_type = ?,Phone = ?, where id_stall = ?`,[name,type,phone,id], callback);
};

const deleteStall = (marketData, callback) => {
  const {id } = marketData;
  db.query( `DELETE FROM ${TABLE} WHERE id_stall = ?`, [id], callback);
};


module.exports = {
  getAllStalls,
  getStallById,
  createStall,
  updateStall,
  deleteStall
}