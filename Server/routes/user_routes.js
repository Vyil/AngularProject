const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

//public routes
router.post('/user', userController.createNewUser);

router.get('/user/:id?',userController.getUser);

module.exports = router;