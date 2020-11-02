const {
  scrapePlantDetails,
  scrapeDiseaseDetails,
} = require("./scraping/scrapeByDetailsUrl")
const searchPlantsByName = require("./scraping/scrapeByName")
const controller = require("../../db/controllers/controller")

const searchPlantsFullInfo = async (plantName, detailsUrl) => {
  const plantDetails = await scrapePlantDetails(plantName, detailsUrl)
  return plantDetails
}

const savePlantToDB = async (plant) => {
  const newPlantFullData = await controller.plants.createPlant(plant)
  return newPlantFullData
}

const savePlantDiseasesToDB = async (plant) => {
  const diseases = []
  for (let d of plant.diseases) {
    const diseaseFullDetails = await scrapeDiseaseDetails(d)
    const disease = await controller.plants.associatePlantDisease(
      diseaseFullDetails,
      plant.scientific_name
    )
    if (disease.error) {
      return disease
    } else {
      diseases.push(disease)
    }
  }
  return diseases
}

const savePlantConditionsToDB = async (plant) => {
  const conditions = []
  for (let conditionFullDetails of plant.conditions) {
    const condition = await controller.plants.associatePlantCondition(
      conditionFullDetails,
      plant.scientific_name
    )
    if (condition.error) {
      return condition
    } else {
      conditions.push(condition)
    }
  }
  return conditions
}

const getPlantInfo = async (plantId) => {
  const plant = await controller.plants.getPlantById(plantId)
  return plant
}
const updatePlantInfo = async (plantId, updatedDetails) => {
  const updatedPlant = await controller.plants.updatePlant(
    plantId,
    updatedDetails
  )

  return updatedPlant
}
const deletePlantFromDB = async (plantId) => {
  const plant = await controller.plants.deletePlant(plantId)
  return plant
}

module.exports = {
  searchPlantsByName,
  searchPlantsFullInfo,
  savePlantToDB,
  savePlantDiseasesToDB,
  savePlantConditionsToDB,
  getPlantInfo,
  updatePlantInfo,
  deletePlantFromDB,
}
