import Router from 'express'
// import baseModel from 'apiProxy/models/base'
import vehicleController from 'apiProxy/controllers/vehicles'

const routes = Router()

// routes.get('/', (req, res) => {
//   res.status(200).json(baseModel({ Message: `Welcome to  ${process.env.API_NAME} API` }))
// })

/**
 * @swagger
 * /vehicles/{modelYear}/{manufacturer}/{model}:
 *   get:
 *     tags:
 *       - Vehicles
 *     summary: Gets the information of a vehicle
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: modelYear
 *         description: Year of the car model
 *         in: path
 *         required: true
 *         type: integer
 *         example: 2018
 *       - name: manufacturer
 *         description: Car Manufacturer
 *         in: path
 *         required: true
 *         type: string
 *         example: Audi
 *       - name: model
 *         description: Car Model
 *         in: path
 *         required: true
 *         type: string
 *         example: A3
 *       - name: withRating
 *         description: Determinates if the response should include CrashRaing
 *         in: query
 *         type: string
 *         example: bananas
 *     responses:
 *       200:
 *         description: API Base Model Response
 *         schema:
 *             $ref: '#/definitions/baseModelResponse'
 */
routes.get('/vehicles/:modelYear/:manufacturer/:model', async (req, res) => {
  await vehicleController.getVehicles(req, res)
})

/**
 * @swagger
 * /vehicles:
 *   post:
 *     tags:
 *       - Vehicles
 *     summary: Searches the information of a vehicle
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: vehicleModelRequest
 *         description: vehicleModelRequest Object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/vehicleModelRequest'
 *       ## Also can be parametrized to bring the CrashRating
 *       #- name: withRating
 *       #  description: Determinates if the response should include CrashRating
 *       #  in: query
 *       #  type: string
 *     responses:
 *       200:
 *         description: API Base Model Response
 *         schema:
 *           $ref: '#/definitions/baseModelResponse'
 */
routes.post('/vehicles', async (req, res) => {
  await vehicleController.getVehicles(req, res)
})

module.exports = routes
