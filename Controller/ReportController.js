const express = require('express');
const reportModel = require('../entities/reportEntities')
const bodyParser = require('body-parser');
const {createReport,getAllReport, updateReport, updateReport_wait} = reportModel
const router = express.Router();
router.use(bodyParser.json());

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

  router.put('/:id', (req, res) => {
    const id = req.params.id;
    const reportData = req.body;
    reportModel.updateReport(id, (err, result) => {
      if (err) {
        res.status(500).json({ 'status': 'error', 'message': 'Internal Server Error' });
        return;
      }
      res.json(result);
    });
  });
  
  router.put('/wait/:id', (req, res) => {
    const id = req.params.id;
    const reportData = req.body;
    reportModel.updateReport_wait(id, (err, result) => {
      if (err) {
        res.status(500).json({ 'status': 'error', 'message': 'Internal Server Error' });
        return;
      }
      res.json(result);
    });
  });

  router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const reportData = req.body;
    reportModel.deleteReport(id, (err, result) => {
      if (err) {
        res.status(500).json({ 'status': 'error', 'message': 'Internal Server Error' });
        return;
      }
      res.json(result);
    });
  });

  module.exports = router;
  