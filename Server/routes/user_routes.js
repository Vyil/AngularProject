const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

//public routes
router.post('/user', userController.createNewUser);

module.exports = router;