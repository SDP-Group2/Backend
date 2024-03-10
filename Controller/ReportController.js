const express = require('express');
const reportModel = require('../entities/reportEntities')
const {createReport,getAllReport} = reportModel
const router = express.Router();

router.get('/all', (req, res) => {
  reportModel.getAllReport((err, result) => {
    if (err) {
      res.status(500).json({ 'status': 'error', 'message': 'Internal Server Error' });
      return;
    }
    res.json(result);
  });
});

router.post('/', (req, res) => {
    const reportData = req.body;
    const filePath = req.file.path;
    reportData.file = filePath;
    reportModel.createReport(reportData, (err, result) => {
      if (err) {
        res.status(500).json({ 'status': 'error', 'message': 'Internal Server Error' });
        return;
      }
      res.json(result);
    });
  });




  module.exports = router;
  