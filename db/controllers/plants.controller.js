const db = require("../sequelize")

const createPlant = async (plant) => {
  const now = new Date()
  try {
    const newPlant = await db.plants.create({
      nickname: plant.nickname,
      scientific_name: plant.name,
      garden_area_id: plant.garden_area_id,
      img_link: plant.img,
      watering_frequency: plant.watering_frequency,
      measurements: plant.measurements,
      created_at: now,
      updated_at: now,
      is_deleted: 0,
    })

    console.log("successfully created " + newPlant)
    return newPlant
  } catch (err) {
    console.log(">> Error while creating plant: ", err)
    return err
  }
}

module.exports = { createPlant }
