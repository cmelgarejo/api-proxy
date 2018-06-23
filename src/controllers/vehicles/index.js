import axios from 'axios'
import baseModel from 'apiProxy/models/base'
import vehicleModel from 'apiProxy/models/vehicle'

// Gets the vehicle detail from API and adds the result to the parameter object
const getVehicleDetail = async vehicle => {
  const { VEHICLE_API_BASE_URL } = process.env
  const apiRequestURL = `${VEHICLE_API_BASE_URL}/VehicleId/${vehicle.VehicleId}?format=json`
  const apiRes = await axios.get(apiRequestURL)
  try {
    return {
      ...vehicle,
      VehicleDetail:
        apiRes.status === 200 && apiRes.data && apiRes.data.Count > 0 ? apiRes.data.Results[0] : {},
    }
  } catch (apiError) {
    // Could use Winston to do better logging
    console.error(apiError.response.status, apiError.response.statusText, apiError.response.data)
    return vehicle
  }
}

// Enriches of the results array with vehicle detail
const addVehicleDetail = async data => {
  const Results = await Promise.all(data.Results.map(vehicle => getVehicleDetail(vehicle)))
  return { ...data, Results }
}

// Gets a list of vehicles from the API
const getVehicles = async (req, res) => {
  const { withRating } = req.query
  const { modelYear, manufacturer, model } = (req.method.toUpperCase() === 'GET' ? req.params : req.body) || {}
  const { VEHICLE_API_BASE_URL } = process.env
  const apiRequestURL = `${VEHICLE_API_BASE_URL}/modelyear/${modelYear}/make/${manufacturer}/model/${model}?format=json`
  try {
    const apiRes = await axios.get(apiRequestURL)
    if (apiRes.status === 200 && apiRes.data.constructor === Object) {
      const vehicleData = apiRes.data && withRating === 'true' ? await addVehicleDetail(apiRes.data) : apiRes.data
      const searchResponse = vehicleModel(vehicleData)
      res.status(200).json(searchResponse)
    }
  } catch (apiError) {
    res.status(200).json(baseModel())
    // Could use Winston to do better logging
    console.error(apiError.response.status, apiError.response.statusText, apiError.response.data)
  }
}

export default { getVehicles }
