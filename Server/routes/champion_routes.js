const express = require('express');
const router = express.Router();

const championController = require('../controllers/championController');

//public routes
router.post('/champion', championController.createChampion);

module.exports = router;