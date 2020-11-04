const express = require('express')
const aeroController = require('../controllers/aero_controller')

const router = express.Router()

/**
 * @swagger 
 * /api/aero:
 *  get:
 *    tags:
 *      - aero
 *    name: aero
 *    produces:
 *      - application/json
 *    parameters:
 *      - in : query
 *        name: parameter_set
 *        schema:
 *          type: integer
 *      - in : query
 *        name: PlotId
 *        schema:
 *          type: string
 *      - in : query
 *        name: Source
 *        schema:
 *          type: string
 *      - in : query
 *        name: ModelRunKey
 *        schema:
 *          type: number
 *    responses:
 *      '200':
 *        description: A successful response.
 *        schema:
 *          type: "array"
 *          items:
 *            $ref: "#/definitions/aero"
 *definitions:
 *  aero:
 *    type: "object"
 *    properties:
 *      parameter_set:
 *        type: "integer"
 *      likelihood:
 *        type: "number"
 *      horizontal_flux_total:
 *        type: "number"
 *      vertical_flux:
 *        type: "number"
 *      PM1:
 *        type: "number"
 *      PM2_5:
 *        type: "number"
 *      PM10:
 *        type: "number"
 *      PlotId:
 *        type: "string"
 *      Source:
 *        type: "string"
 *      ModelRunKey:
 *        type: "string"
 * 
 */


router.get('/aero', aeroController.getAeroData)

module.exports = router