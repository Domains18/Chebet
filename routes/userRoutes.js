const express = require('express')
const router = express.Router()
const usersController = require('../controllers/userController')

router.route('/')
    .post(usersController.createNewUser)
    .get(usersController.getAllUser)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser)

module.exports = router
