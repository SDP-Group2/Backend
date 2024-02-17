const db = require('../config/db');
const { TABLE } = process.env;

db.connect()

const getAllMarkets = (callback) => {
  db.query(`SELECT * FROM ${TABLE}`, callback);
};

const getMarketById = (id, callback) => {
  db.query(`SELECT * FROM ${TABLE} WHERE id_stall=?`, [id], callback);
};

const createMarket = (marketData, callback) => {
  const { name,type,phone} = marketData;
  db.query(`INSERT INTO ${TABLE} (Stall_name, Stall_type,Phone) VALUES (?, ?, ?)`, [name,type,phone], callback);
};

const updateMarket = (marketData, callback) => {
  const { name,type,phone,id } = marketData;
  console.log(location,type_shop)
  db.query( `update ${TABLE} set Stall_name = ?,Stall_type = ?,Phone = ?, where id_stall = ?`,[name,type,phone,id], callback);
};

const deleteMarket = (marketData, callback) => {
  const {id } = marketData;
  db.query( `DELETE FROM ${TABLE} WHERE id_stall = ?`, [id], callback);
};


module.exports = {
  getAllMarkets,
  getMarketById,
  createMarket,
  updateMarket,
  deleteMarket
}