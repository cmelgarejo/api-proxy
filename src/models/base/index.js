/**
 * @swagger
 * definitions:
 *   baseModelResponse:
 *     type: object
 *     properties:
 *       Count:
 *         type: integer
 *         example: 0
 *       #Messages:
 *       #  type: string
 *       #  example: ""
 *       Result:
 *         type: array
 *         items:
 *           oneOf:
 *             - $ref: '#/definitions/vehicleModelResponse'
 */
export default params => {
  const verbose = process.env.API_RESPONSE_VERBOSE && process.env.API_RESPONSE_VERBOSE === 'true'
  const { Results, Message } = params || { Results: [] }
  // Pattern matching and shielding in case the required parameters are not present (i.e: Results)
  const Count = Results && Results.constructor === Array ? Results.length : 0
  const model = {
    Count,
    // This can enable verbosity on responses, maybe we want to relay a message to the consumer
    Message: verbose ? Message : undefined,
    Results,
  }
  return model
}
