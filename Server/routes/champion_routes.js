const express = require('express');
const router = express.Router();

const championController = require('../controllers/championController');

//public routes
router.post('/champion', championController.createChampion);
router.get('/champion/:id?',championController.getChampion);
router.get('/champion/user/:id?',championController.getPlayerChampions);

module.exports = router;