const express = require('express');
const router = express.Router();
const serverController = require('../controllers/server');
router.get('/read', serverController.getAll);
router.post('/add', serverController.create);
router.get('/:serverId', serverController.getById);
router.put('/:serverId', serverController.updateById);
router.delete('/:serverId', serverController.deleteById);
module.exports = router;
