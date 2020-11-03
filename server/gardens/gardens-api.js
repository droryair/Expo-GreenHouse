const gardens = require("./gardens"), 
      express = require("express"),
      router  = express.Router()

router.get("/gardens/:userId", async (req, res) => {
try {
const { userId }  = req.params
const gardenAreas = await gardens.getAllGardenAreasOfUser(userId)
res.send(gardenAreas)
} catch (err) {
res.send(err)
}
})
router.post("/garden", async (req, res) => {
  try {
    const gardenInfo    = req.body
    const newGardenArea = await gardens.saveGardenAreaToDB(gardenInfo)
    const conditions    = await gardens.saveGardenConditionsToDB(gardenInfo.conditions,newGardenArea.id)
    newGardenArea["conditions"] = conditions
    res.send(newGardenArea)
  } catch (err) {
    res.send(err)
  }
})

router.put("/garden/:gardenId", async (req, res) => {
      try {
        const updateBody = req.body
        const { gardenId } = req.params
        console.log(updateBody);
        console.log(gardenId);
        if (updateBody && gardenId) {
          const updatedGarden = await gardens.updateGardenInfo(gardenId, updateBody)
          res.send(updatedGarden)
        } else {
          res.status(400)
        }
      } catch (err) {
        res.send(err)
      }
})

router.delete("/garden/:gardenId", async (req, res) => {
  try {
    const { gardenId } = req.params
    const remainingGardens = await gardens.deleteGardenArea(gardenId)
    res.send(remainingGardens)
  } catch (err) {
    res.send(err)
  }
})

module.exports = router
