const express = require("express"),
  router = express.Router(),
  botanist = require("./botanist")

router.get("/disease/:diseaseId", async (req, res) => {
  try {
    const { diseaseId } = req.params
    const diseaseInfo = await botanist.getDiseaseInfo(diseaseId)
    res.send(diseaseInfo)
  } catch (err) {
    res.send(err)
  }
})

router.get("/plant/:plantId/diseases", async (req, res) => {
  try {
    const { plantId } = req.params
    const { filter } = req.query || null
    const possibleDiseases = await botanist.getAllDiseasesOfPlant(
      plantId,
      filter
    )
    res.send(possibleDiseases)
  } catch (err) {
    res.send(err)
  }
})

module.exports = router
