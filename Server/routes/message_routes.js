const express = require('express');
const router = express.Router();

const messageController = require('../controllers/messageController');

//public routes
router.post('/message', messageController.postMessage);


module.exports = router;