const db = require("../sequelize")
// Add all methods below for CRUD operations on users, then add them to the export object.
// For example check plants.controller.js
const getAllGardens = async (userId) => {
  try {
    const gardenArea = await db.gardenAreas.findAll({
      where:{id:userId}
    })
    return gardenArea[0].dataValues
  } catch (error) {
    const errMsg = {
      message: "Error while getting garden areas",
      error,
    }
    console.log(errMsg)
    return errMsg
  }
}
const createGarden = async (garden) => {
  try{
      const newGarden = await db.gardenAreas.create({
        name:    garden.name,
        user_id: garden.user_id,
      })
    
      console.log("successfully created garden. id: " + newGarden.id)
      return newGarden
  } catch (error) {
    const errMsg = {
      message: "Error while creating a garden areas",
      error,
    }
    console.log(errMsg)
    return errMsg
  }
}
const associateGardenCondition = async (conditionDetails , gardenAreaId) =>{
  console.log(conditionDetails);
  // Add condition if doesn't exist then associate to garden area  group if not associated yet
  try {
    const conditionData = await db.conditions.findOrCreate({
      where: { name: conditionDetails.name, value: conditionDetails.value },
      defaults: {
        name: conditionDetails.name,
        value: conditionDetails.value,
      },
    })
    const condition = conditionData[0].dataValues
    await db.gardenAreaToCondition.findOrCreate({
      where: { condition_id: condition.id, garden_area_id: gardenAreaId },
      defaults: {
        condition_id:   condition.id,
        garden_area_id: gardenAreaId,
      },
    })
    return condition
  } catch (error) {
    const errMsg = {
      message: "Error occurred during garden-area to condition association",
      error,
    }
    console.log(errMsg)
    return errMsg
  }
}
const updateGarden = async (gardenId, updatedDetails) => {

}
const deleteGarden = async (gardenId) => {

}

module.exports = { 
  createGarden, 
  associateGardenCondition,
  getAllGardens,
  updateGarden,
  deleteGarden
}
