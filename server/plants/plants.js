const {
  scrapePlantDetails,
  scrapeDiseaseDetails,
} = require("./scraping/scrapeByDetailsUrl")
const searchPlantsByName = require("./scraping/scrapeByName")
const controller = require("../../db/controllers/controller")
const db = require("../../db/sequelize")

const searchPlantsFullInfo = async (plantName, detailsUrl) => {
  const plantDetails = await scrapePlantDetails(plantName, detailsUrl)
  const plant = {
    scientific_name: plantName,
    conditions: plantDetails.conditions,
    img: plantDetails.img,
    diseases: plantDetails.diseases,
    measurements: plantDetails.measurements,
  }

  return plant
}

const savePlantToDB = async (plant) => {
  const newPlantFullData = await controller.plants.createPlant(plant)
  return newPlantFullData
}

const savePlantDiseasesToDB = async (plant) => {
  for (let d of plant.diseases) {
    const diseaseFullDetails = await scrapeDiseaseDetails(d)
    await controller.plants.associatePlantDisease(
      diseaseFullDetails,
      plant.scientific_name
    )
  }
}

const savePlantConditionsToDB = async (plant) => {
  for (let conditionFullDetails of plant.conditions) {
    await controller.plants.associatePlantCondition(
      conditionFullDetails,
      plant.scientific_name
    )
  }
}

module.exports = {
  searchPlantsByName,
  searchPlantsFullInfo,
  savePlantToDB,
  savePlantDiseasesToDB,
  savePlantConditionsToDB,
}
