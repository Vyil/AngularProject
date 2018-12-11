const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');


router.post('/user', userController.createNewUser);

router.get('/user/',userController.getUser);
router.get('/user/:id',userController.getById);
router.put('/user/:id',userController.editUser);
router.delete('/user/:id',userController.deleteUser);
router.post('/user/gold',userController.addGold);

module.exports = router;