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
    })

    console.log("successfully created plant. id: " + newPlant.id)
    // newPlant[diseases]
    return newPlant
  } catch (error) {
    return { message: "Error while creating plant", error }
  }
}

const associatePlantDisease = async (diseaseDetails, plantGroup) => {
  // Add disease if doesn't exist then associate to plant group if not associated yet
  try {
    const disease = await db.diseases.findOrCreate({
      where: { scientific_name: diseaseDetails.scientific_name },
      defaults: {
        name: diseaseDetails.name,
        scientific_name: diseaseDetails.scientific_name,
        time_of_year: diseaseDetails.time_of_year,
        treatment: diseaseDetails.treatment,
        main_symptoms: diseaseDetails.main_symptoms,
        img_link: diseaseDetails.img_link,
      },
    })
    await db.diseaseToPlant.findOrCreate({
      where: { plant_group: plantGroup, disease_id: disease.id },
      defaults: { disease_id: disease.id, plant_group: plantGroup },
    })
  } catch (error) {
    console.log({
      message: "Error while plant to disease association",
      error,
    })
  }
}
const associatePlantCondition = async (conditionDetails, plantGroup) => {
  // Add condition if doesn't exist then associate to plant group if not associated yet
  try {
    const condition = await db.conditions.findOrCreate({
      where: { name: conditionDetails.name, value: conditionDetails.value },
      defaults: {
        name: conditionDetails.name,
        value: conditionDetails.value,
      },
    })
    await db.plantToCondition.findOrCreate({
      where: { condition_id: condition.id, plant_group: plantGroup },
      defaults: {
        condition_id: condition.id,
        plant_group: plantGroup,
      },
    })
  } catch (error) {
    console.log({
      message: "Error while plant to condition association",
      error,
    })
  }
}

module.exports = { createPlant, associatePlantDisease, associatePlantCondition }
