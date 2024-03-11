const express = require('express');
const stallModel = require('../entities/stallEntities')
const bodyParser = require('body-parser');
const {getAllStalls,getStallById,createStall,updateStall,deleteStall, deleteBothStall} = stallModel
const router = express.Router();
router.use(bodyParser.json());
router.get('/all', (req, res) => {
  stallModel.getAllStalls((err, result) => {
    if (err) {
      res.status(500).json({ 'status': 'error', 'message': 'Internal Server Error' });
      return;
    }
    res.json(result);
  });
})


router.get('/:id', (req, res) => {
    const id = req.params.id;
    stallModel.getStallById(id, (err, result) => {
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
    const stallData = req.body;
    const filePath = req.file.path;
    stallData.file = filePath;
    stallModel.createStall(stallData, (err, result) => {
      if (err) {
        res.status(500).json({ 'status': 'error', 'message': 'Internal Server Error' });
        return;
      }
      res.json(result);
    });
  });
  

  router.put('/:id', (req, res) => {
    const id = req.params.id;
    const stallData = req.body;
    stallModel.updateStall(id, (err, result) => {
      if (err) {
        res.status(500).json({ 'status': 'error', 'message': 'Internal Server Error' });
        return;
      }
      res.json(result);
    });
  });
  


  router.delete('/:id', (req,res) => {
    const id = req.params.id;

    stallModel.deleteStall({ id },(err, result) => {
      if (err) {
        res.status(500).json({ 'status': 'error', 'message': 'Internal Server Error' });
        return;
      }
      res.json(result);
    });
  });


  router.delete('/both/:id', (req,res) => {
    const id = req.params.id;

    stallModel.deleteBothStall({ id },(err, result) => {
      if (err) {
        res.status(500).json({ 'status': 'error', 'message': 'Internal Server Error' });
        return;
      }
      res.json(result);
    });
  });

  module.exports = router;
  