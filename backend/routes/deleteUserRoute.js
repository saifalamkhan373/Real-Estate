const express = require('express')
const router = express.Router()
const deleteUser = require('../controllers/deleteUserController')
const { verifyToken } = require('../middleware/verifyToken')

router.route('/:id').delete(verifyToken, deleteUser)

module.exports = router