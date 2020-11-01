const {
  scrapePlantDetails,
  scrapeDiseaseDetails,
} = require("./scraping/scrapeByDetailsUrl")
const searchPlantsByName = require("./scraping/scrapeByName")
const controller = require("../../db/controllers/controller")
const { plants } = require("../../db/sequelize")

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
  plant.diseases.map(async (d) => {
    const diseaseDetails = await scrapeDiseaseDetails(d)
    const {
      scientific_name,
      most_active,
      treatment,
      main_symptom,
      img,
    } = diseaseDetails
    const disease = {
      name: d.name,
      scientific_name,
      most_active,
      treatment,
      main_symptom,
      img,
      url: d.url,
    }
    return disease
  })
  //const newPlantFullData = await controller.plants.createPlant(plant)
  // return newPlantFullData
}

module.exports = { searchPlantsByName, searchPlantsFullInfo, savePlantToDB }
