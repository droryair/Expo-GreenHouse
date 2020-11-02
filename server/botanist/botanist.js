const controller = require("../../db/controllers/controller")
const getRecommendations = require("./scraping/scrapePlantsRecommendation")
// Can use "./enteties/Disease"

const getDiseaseInfo = async (diseaseId) => {
  // Write code
  // return data
  // controller.botanist.getDiseaseById....
}
const getAllDiseasesOfPlant = async (plantId) => {
  // Write code
  // return data
  // controller.diseases.getDiseasesByPlant....
}
const getPlantByConditions = async (conditions) => {
  // Write code
  // return data
  // const recommendedPlants = await getRecommendations.byConditions(conditions)
}

const getPlantsByType = async (conditions) => {
  // Write code
  // return data
  // const recommendedPlants = await getRecommendations.byPlantType(conditions)
}

module.exports = {
  getDiseaseInfo,
  getAllDiseasesOfPlant,
  getPlantByConditions,
  getPlantsByType,
}
