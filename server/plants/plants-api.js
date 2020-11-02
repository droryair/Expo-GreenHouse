const express = require("express"),
  router = express.Router(),
  plants = require("./plants")

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

router.post("/plant", async (req, res) => {
  try {
    const plantInfo = req.body
    const newPlant = await plants.savePlantToDB(plantInfo)
    const diseases = await plants.savePlantDiseasesToDB(plantInfo)
    const conditions = await plants.savePlantConditionsToDB(plantInfo)
    newPlant["diseases"] = diseases
    newPlant["conditions"] = conditions
    res.send(newPlant)
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

router.put("/plant/:plantId", async (req, res) => {
  try {
    const updateBody = req.body
    const { plantId } = req.params
    if (updateBody && plantId) {
      const updatedPlant = await plants.updatePlantInfo(plantId, updateBody)
      res.send(updatedPlant)
    } else {
      res.status(400)
    }
  } catch (err) {
    res.send(err)
  }
})

router.delete("/plant/:plantId", async (req, res) => {
  try {
    const { plantId } = req.params
    const remainingPlants = await plants.deletePlantFromDB(plantId)
    res.send(remainingPlants)
  } catch (err) {
    res.send(err)
  }
})

module.exports = router
