const {
  scrapePlantDetails,
  scrapeDiseaseDetails,
} = require("./scraping/scrapeByDetailsUrl")
const searchPlantsByName = require("./scraping/scrapeByName")
const plantModel = require("./models/Plant")

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
  const db = require("../../db/sequelize")
  for (let d of plant.diseases) {
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

    diseases.push(disease)
  }

  const newPlant = await db.query(
    `INSERT INTO plants VALUES(null, '${plant.nickname}', '${plant.name}',${plant.garden_area_id},'${plant.img_link}',${plant.watering_frequency},'${plant.measurements}',now(),now(),0)`
  )
  console.log(newPlant)
  return newPlant
}

module.exports = { searchPlantsByName, searchPlantsFullInfo, savePlantToDB }
