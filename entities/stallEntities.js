const db = require('../config/db');
const { TABLE, TABLE_3 } = process.env;

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
  const { name, type, phone, stall, rows, startDate, endDate, file } = marketData;
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);

  const rowsArray = rows.split(',').map(row => row.trim());

  Promise.all(rowsArray.map(row => {
    return new Promise((resolve, reject) => {
      const rowsAsNumber = parseInt(row);
      db.query(`SELECT id_lock FROM ${TABLE_3} WHERE lock_key = ? AND num = ?`, [stall, rowsAsNumber], (error, results) => {
        if (error) {
          console.error('Error performing SELECT query:', error);
          reject(error);
        } else {
          if (results.length > 0) {
            const idLock = results[0].id_lock;
            db.query(`INSERT INTO ${TABLE} (ID_lock, Name_shop, path_to_imag_slip, date_start, date_end, type, phone) VALUES (?, ?, ?, ?, ?, ?, ?)`, [idLock, name, file, startDateObj, endDateObj, type, phone], (error, insertResult) => {
              if (error) {
                console.error('Error performing INSERT query:', error);
                reject(error);
              } else {
                db.query(`UPDATE ${TABLE_3} SET status = 1 WHERE id_lock = ?`, [idLock], (error, updateResult) => {
                  if (error) {
                    console.error('Error performing UPDATE query:', error);
                    reject(error);
                  } else {
                    resolve(idLock);
                  }
                });
              }
            });
          } else {
            resolve(null);
          }
        }
      });
    });
  }))
  .then(results => {
    callback(null, results);
  })
  .catch(error => {
    callback(error, null);
  });
};


const updateStall = (marketData, callback) => {
  const { status,id } = marketData;
  console.log(location,type_shop)
  db.query( `update ${TABLE} set status where ID_stall = ?`,[status,id], callback);
};

const deleteStall = (marketData, callback) => {
  const {id } = marketData;
  db.query( `DELETE FROM ${TABLE} WHERE Name_shop = ?`, [id], callback);
};


module.exports = {
  getAllStalls,
  getStallById,
  createStall,
  updateStall,
  deleteStall
}