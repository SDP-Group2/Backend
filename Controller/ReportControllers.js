const express = require('express');
const reportModel = require('../entities/reportEntities')
const {createReport} = reportModel
const router = express.Router();


router.post('/', (req, res) => {
    const ReportData = req.body;
    reportModel.createMarket(ReportData, (err, result) => {
      if (err) {
        res.status(500).json({ 'status': 'error', 'message': 'Internal Server Error' });
        return;
      }
      res.json(result);
    });
  });




  module.exports = router;
  