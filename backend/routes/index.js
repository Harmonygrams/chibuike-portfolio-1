const routes = require('express').Router()
const sendContactForm = require('../utils/sendContactForm')
routes.post('/send', sendContactForm.sendContactForm)
module.exports = routes