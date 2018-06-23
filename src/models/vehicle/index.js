import baseModel from 'apiProxy/models/base'

/**
 * @swagger
 * definitions:
 *   vehicleModelRequest:
 *     type: object
 *     properties:
 *       modelYear:
 *         type: integer
 *         example: 2018
 *       manufacturer:
 *         type: string
 *         example: Audi
 *       model:
 *         type: integer
 *         example: A3
 *   vehicleModelResponse:
 *     type: object
 *     properties:
 *       VehicleDescription:
 *         type: integer
 *         example: "A description"
 *       VehicleId:
 *         type: integer
 *         example: 123
 *       CrashRating:
 *         type: integer
 *         example: Not Rated
 *         required: false
 */
export default data => {
  // Checks whether the data has results or maybe failed
  const Results = data.Results
    ? data.Results.map(vehicle => ({
      VehicleId: vehicle.VehicleId,
      Description: vehicle.VehicleDescription,
      CrashRating: vehicle.VehicleDetail && vehicle.VehicleDetail.OverallRating,
    }))
    : []
  return baseModel({
    ...data,
    Results,
  })
}
