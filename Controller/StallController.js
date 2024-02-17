const express = require('express');
const marketModel = require('../entities/stallEntities')
const {getAllStalls,getStallById,createStall,updateStall,deleteStall} = marketModel
const router = express.Router();

router.get('/all', (req, res) => {
  marketModel.getAllMarkets((err, result) => {
    if (err) {
      res.status(500).json({ 'status': 'error', 'message': 'Internal Server Error' });
      return;
    }
    res.json(result);
  });
});


router.get('/:id', (req, res) => {
    const id = req.params.id;
    marketModel.getMarketById(id, (err, result) => {
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


  
  router.post('/', (req, res) => {
    const marketData = req.body;
    marketModel.createMarket(marketData, (err, result) => {
      if (err) {
        res.status(500).json({ 'status': 'error', 'message': 'Internal Server Error' });
        return;
      }
      res.json(result);
    });
  });


  router.put('/', (req, res) => {
    const marketData = req.body;
    marketModel.updateMarket(marketData, (err, result) => {
      if (err) {
        res.status(500).json({ 'status': 'error', 'message': 'Internal Server Error' });
        return;
      }
      res.json(result);
    });
  });
  
  


  router.delete('/:id', (req,res) => {
    const id = req.params.id;

    marketModel.deleteMarket({ id },(err, result) => {
      if (err) {
        res.status(500).json({ 'status': 'error', 'message': 'Internal Server Error' });
        return;
      }
      res.json(result);
    });
  });



  module.exports = router;
  