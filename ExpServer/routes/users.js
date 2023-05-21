const express = require('express')

const userRoutes = require('../controllers/users')

const router = express.Router();

router.post('/signup', userRoutes.addUsers)

router.get('/', userRoutes.getUsers)

module.exports = router;