const express = require('express')
const aeroController = require('../controllers/aero_controller')

const router = express.Router()

router.get('/aero', aeroController.getAeroData)

module.exports = router