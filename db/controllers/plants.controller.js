const db = require("../sequelize")

const createPlant = async (plant) => {
  const now = new Date()
  try {
    const newPlant = await db.plants.create({
      nickname: plant.nickname,
      scientific_name: plant.scientific_name,
      garden_area_id: plant.garden_area_id,
      img_link: plant.img_link,
      watering_frequency: plant.watering_frequency,
      measurements: plant.measurements,
      created_at: now,
      updated_at: now,
      external_link: plant.external_link,
    })

    console.log("successfully created plant. id: " + newPlant.id)
    return newPlant
  } catch (error) {
    return { message: "Error while creating plant", error }
  }
}

const associatePlantDisease = async (diseaseDetails, plantGroup) => {
  // Add disease if doesn't exist then associate to plant group if not associated yet
  try {
    const diseaseData = await db.diseases.findOrCreate({
      where: { scientific_name: diseaseDetails.scientific_name },
      defaults: {
        name: diseaseDetails.name,
        scientific_name: diseaseDetails.scientific_name,
        time_of_year: diseaseDetails.time_of_year,
        treatment: diseaseDetails.treatment,
        main_symptoms: diseaseDetails.main_symptoms,
        img_link: diseaseDetails.img_link,
        external_link: diseaseDetails.external_link,
      },
    })
    const disease = diseaseData[0].dataValues
    await db.diseaseToPlant.findOrCreate({
      where: { plant_group: plantGroup, disease_id: disease.id },
      defaults: { disease_id: disease.id, plant_group: plantGroup },
    })
    return disease
  } catch (error) {
    const errMsg = {
      message: "Error occured during plant to disease association",
      error,
    }
    console.log(errMsg)
    return errMsg
  }
}
const associatePlantCondition = async (conditionDetails, plantGroup) => {
  // Add condition if doesn't exist then associate to plant group if not associated yet
  try {
    const conditionData = await db.conditions.findOrCreate({
      where: { name: conditionDetails.name, value: conditionDetails.value },
      defaults: {
        name: conditionDetails.name,
        value: conditionDetails.value,
      },
    })
    const condition = conditionData[0].dataValues
    await db.plantToCondition.findOrCreate({
      where: { condition_id: condition.id, plant_group: plantGroup },
      defaults: {
        condition_id: condition.id,
        plant_group: plantGroup,
      },
    })
    return condition
  } catch (error) {
    const errMsg = {
      message: "Error occured during plant to condition association",
      error,
    }
    console.log(errMsg)
    return errMsg
  }
}

const getPlantById = async (plantId) => {
  try {
    const plant = await db.plants.findAll({
      where: { id: plantId },
      include: [
        { model: db.diseases, as: "diseases", through: db.diseaseToPlant },
        {
          model: db.conditions,
          as: "conditions",
          through: db.plantToCondition,
        },
      ],
    })
    return plant
  } catch (error) {
    const errMsg = {
      message: "Error while getting plant & associations",
      error,
    }
    console.log(errMsg)
    return errMsg
  }
}

const updatePlant = async (plantId, udpatedDetails) => {
  try {
    const updateObj = Object.assign(udpatedDetails, {
      updated_at: new Date(),
    })
    const plant = await db.plants.update(updateObj, {
      where: { id: plantId },
    })
    if (plant[0]) {
      return plant
    } else {
      return { message: "Couldn't update plant", plantId }
    }
  } catch (error) {
    const errMsg = {
      message: "Error while updating plant",
      error,
    }
    return errMsg
  }
}
const deletePlant = async (plantId) => {
  try {
    let plant = await db.plants.findAll({ where: { id: plantId } })
    let countDeleted = 0
    if (plant.length) {
      plant = plant[0].dataValues

      // If there are other plants with this scientific name, keep associations. otherwise delete them
      const countPlantsInGroup = await db.plants.count({
        where: { scientific_name: plant.scientific_name },
      })
      if (countPlantsInGroup === 1) {
        const deletedConditionsJoinCount = await db.plantToCondition.destroy({
          where: { plant_group: plant.scientific_name },
        })
        countDeleted += deletedConditionsJoinCount
        const deletedDiseasesJoinCount = await db.diseaseToPlant.destroy({
          where: { plant_group: plant.scientific_name },
        })
        countDeleted += deletedDiseasesJoinCount
      }
      const deletedPlant = await db.plants.destroy({ where: { id: plantId } })
      countDeleted += deletedPlant
      return {
        message: "Deleted plant and associations",
        deleted_rows: countDeleted,
      }
    } else {
      return { message: "Couldn't find plant", deleted_rows: countDeleted }
    }
  } catch (error) {
    const errMsg = {
      message: "Error while deleting plant",
      error,
    }
    console.log(errMsg)
    return errMsg
  }
}

module.exports = {
  createPlant,
  associatePlantDisease,
  associatePlantCondition,
  getPlantById,
  updatePlant,
  deletePlant,
}
