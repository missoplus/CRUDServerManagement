const express = require('express')
const router = express.Router()
const groupController = require('../controllers/group');
router.get('/read', groupController.getAll);
router.post('/add', groupController.create);
router.get('/:groupId', groupController.getById);
router.put('/:groupId', groupController.updateById);
router.delete('/:groupId', groupController.deleteById);
module.exports = router;   