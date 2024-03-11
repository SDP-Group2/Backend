const db = require('../config/db');
const { TABLE_3 } = process.env;

db.connect()

const getAllMarket = (callback) => {
  db.query(`SELECT * FROM ${TABLE_3}`, callback);
};

const getMarketBykey = (key, callback) => {
  db.query(`SELECT * FROM ${TABLE_3} WHERE lock_key=?`, [key], callback);
};

const updateMarketToNotNull = (marketData, callback) => {
  const { status,id } = marketData;
  console.log(location,type_shop)
  db.query( `update ${TABLE_3} set status=1 where id_lock = ?`,[status,id], callback);
};

const updateMarketToNull = (marketData, callback) => {
  const { status,id } = marketData;
  if (status.trim() === '' || id.trim() === '' || status.trim().length > 1 || id.trim().length > 50){
    return callback('Invalid input', null);
  }
  else{
  db.query( `update ${TABLE_3} set status=0 where id_lock = ?`,[status,id], callback);
}
};


module.exports = {
  getAllMarket,
  getMarketBykey,
  updateMarketToNotNull,
  updateMarketToNull
}