const express = require('express')
const passwordRoutes = require('../controllers/password')

const router = express.Router();

router.post('/forgotpassword', passwordRoutes.forgotPassword)

module.exports = router