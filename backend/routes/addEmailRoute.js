const express = require('express')
const router = express.Router()
const emails = require('../controllers/emailsController')
const { verifyToken } = require('../middleware/verifyToken')

router.route('/').post(verifyToken, emails)
module.exports = router