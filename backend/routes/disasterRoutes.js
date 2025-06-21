const express = require('express');
const router = express.Router();
const disasterController = require('../controllers/disasterController');

router.post('/', disasterController.createDisaster);
router.get('/', disasterController.getDisasters);
router.put('/:id', disasterController.updateDisaster);
router.delete('/:id', disasterController.deleteDisaster);

module.exports = router;
