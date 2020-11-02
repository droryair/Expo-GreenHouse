const gardens = require("./gardens")

const express = require("express"),
  router = express.Router()

router.post("/garden", async (req, res) => {
  try {
    const { gardenInfo } = req.body
    const newGardenArea = await gardens.createGardenArea(gardenInfo)
    res.send(newGardenArea)
  } catch (err) {
    res.send(err)
  }
})

router.get("/gardens/:userId", async (req, res) => {
  try {
    const { userId } = req.params
    const gardenAreas = await gardens.getAllGardenAreasOfUser(userId)
    res.send(gardenAreas)
  } catch (err) {
    res.send(err)
  }
})
router.delete("/garden/:gardentId", async (req, res) => {
  try {
    const { gardenId } = req.params
    const remainingGardens = await gardens.deleteGardenArea(gardenId)
    res.send(remainingGardens)
  } catch (err) {
    res.send(err)
  }
})

module.exports = router
