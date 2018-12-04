const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

//public routes
router.post('/user', userController.createNewUser);

router.get('/user/:id?',userController.getUser);
router.put('/user/:id',userController.editUser);
router.delete('/user/:id',userController.deleteUser);

module.exports = router;