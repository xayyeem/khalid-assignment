const express = require('express')
const route = express.Router()
const { userform } = require('../controller/form')

route.post('/register', userform)

module.exports = route