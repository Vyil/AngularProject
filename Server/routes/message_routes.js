const express = require('express');
const router = express.Router();

const messageController = require('../controllers/messageController');

//public routes
router.post('/message', messageController.postMessage);
router.delete('/message/:id',messageController.deleteMessage)
router.get('/message',messageController.getMessage);


module.exports = router;