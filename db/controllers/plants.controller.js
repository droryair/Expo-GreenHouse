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
      is_deleted: 0,
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

module.exports = { createPlant, associatePlantDisease, associatePlantCondition }
