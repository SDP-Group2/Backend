const express = require('express');
const marketModel = require('../entities/MarketEntities')
const {getAllMarket,getMarketBykey,updateMarketToNotNull,updateMarketToNull} = marketModel
const router = express.Router();

router.get('/all', (req, res) => {
  marketModel.getAllMarket((err, result) => {
    if (err) {
      res.status(500).json({ 'status': 'error', 'message': 'Internal Server Error' });
      return;
    }
    res.json(result);
  });
})


router.get('/:key', (req, res) => {
    const key = req.params.key;
    marketModel.getMarketBykey(key, (err, result) => {
      if (err) {
        res.status(500).json({ 'status': 'error', 'message': 'Internal Server Error' });
        return;
      }
      if (result.length >= 1) {
        res.json(result);
      } else {
        res.status(404).json({ 'status': 'ERROR', 'message': 'ID not found' });
      }
    });
  });
  


  module.exports = router;
  