const db = require('../config/db');
const { TABLE } = process.env;

db.connect()

const getAllMarkets = (callback) => {
  db.query(`SELECT * FROM ${TABLE}`, callback);
};

const getMarketById = (id, callback) => {
  db.query(`SELECT * FROM ${TABLE} WHERE id=?`, [id], callback);
};

const createMarket = (marketData, callback) => {
  const { location, type_shop } = marketData;
  db.query(`INSERT INTO ${TABLE} (location, type_shop) VALUES (?, ?)`, [location, type_shop], callback);
};

const updateMarket = (marketData, callback) => {
  const { location, type_shop, id } = marketData;
  console.log(location,type_shop)
  db.query( `update ${TABLE} set location = ?,type_shop =? where id = ?`,[location,type_shop,id], callback);
};

const deleteMarket = (marketData, callback) => {
  const {id } = marketData;
  db.query( `DELETE FROM ${TABLE} WHERE id = ?`, [id], callback);
};


module.exports = {
  getAllMarkets,
  getMarketById,
  createMarket,
  updateMarket,
  deleteMarket
}