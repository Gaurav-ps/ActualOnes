const express = require('express')

const userRoutes = require('../controllers/users')

const router = express.Router();

router.post('/signup', userRoutes.addUsers)

module.exports = router;