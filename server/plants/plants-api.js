const express = require("express"),
  axios = require("axios"),
  router = express.Router(),
  plants = require("./plants")

router.post("/garden", async (req, res) => {
  try {
    const { gardenInfo } = req.body
    const newGardenArea = await plants.createGardenArea(gardenInfo)
    res.send(newGardenArea)
  } catch (err) {
    res.send(err)
  }
})

router.get("/gardens/:userId", async (req, res) => {
  try {
    const { userId } = req.params
    const gardenAreas = await plants.getGardenAreasOfUser(userId)
    res.send(gardenAreas)
  } catch (err) {
    res.send(err)
  }
})

router.post("/plant", async (req, res) => {
  try {
    const plantInfo = req.body
    const newPlant = await plants.savePlantToDB(plantInfo)
    res.send(newPlant)

    //const diseases = await plants.savePlantDiseasesToDB(newPlant)
    //const conditions = await plants.savePlantConditionsToDB(plantInfo)
    // tell Frontend when done
  } catch (err) {
    res.send(err)
  }
})

router.put("/plant", async (req, res) => {
  try {
    const { updateBody } = req.body
    const updatedPlant = await plants.updatePlant(updateBody)
    res.send(updatedPlant)
  } catch (err) {
    res.send(err)
  }
})

router.get("/plantForm/:plantName", async (req, res) => {
  try {
    const { plantName } = req.params
    const plantInfo = await plants.searchPlantsByName(plantName)
    res.send(plantInfo)
  } catch (err) {
    res.send(err)
  }
})

router.get("/plantForm/:plantName/info", async (req, res) => {
  try {
    const { plantName } = req.params
    const { detailsUrl } = req.body
    const plantInfo = await plants.searchPlantsFullInfo(plantName, detailsUrl)
    res.send(plantInfo)
  } catch (err) {
    res.send(err)
  }
})

router.get("/plants/:userId/:gardenId?", async (req, res) => {
  try {
    const { userId, gardenId } = req.params
    const allPlants = gardenId
      ? await plants.getAllPlantsInGarden(gardenId)
      : await plants.getAllPlantsOfUser(userId)
    res.send(allPlants)
  } catch (err) {
    res.send(err)
  }
})

router.get("/plants", async (req, res) => {
  try {
    const { conditions } = req.query
    const plantInfo = await plants.getPlantByConditions(conditions)
    res.send(plantInfo)
  } catch (err) {
    res.send(err)
  }
})

router.get("/plant/:plantId", async (req, res) => {
  try {
    const { plantId } = req.params
    const plantInfo = await plants.getPlantInfo(plantId)
    res.send(plantInfo)
  } catch (err) {
    res.send(err)
  }
})

router.get("/plant/:plantId/diseases", async (req, res) => {
  try {
    const { plantId } = req.params
    const { filter } = req.query || null
    const possibleDiseases = await plants.getAllDiseasesOfPlant(plantId, filter)
    res.send(possibleDiseases)
  } catch (err) {
    res.send(err)
  }
})

router.get("/disease/:diseaseId", async (req, res) => {
  try {
    const { diseaseId } = req.params
    const diseaseInfo = await plants.getDiseaseInfo(diseaseId)
    res.send(diseaseInfo)
  } catch (err) {
    res.send(err)
  }
})

router.delete("/plant/:plantId", async (req, res) => {
  try {
    const { plantId } = req.params
    const remainingPlants = await plants.deletePlant(plantId)
    res.send(remainingPlants)
  } catch (err) {
    res.send(err)
  }
})

router.delete("/garden/:gardentId", async (req, res) => {
  try {
    const { gardenId } = req.params
    const remainingGardens = await plants.deleteGardenArea(gardenId)
    res.send(remainingGardens)
  } catch (err) {
    res.send(err)
  }
})

module.exports = router
