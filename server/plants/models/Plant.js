const db = require("../../../db/sequelize")
const { DataTypes } = require("sequelize")

const Plant = db.define("plants", {
  id: { type: DataTypes.INTEGER, primaryKey: true },
  nickname: DataTypes.TEXT,
  scientific_name: DataTypes.TEXT,
  garden_area_id: DataTypes.INTEGER,
  img_link: DataTypes.TEXT,
  watering_frequency: DataTypes.INTEGER,
  measurements: DataTypes.JSON,
  created_at: DataTypes.TIME,
  updated_at: DataTypes.TIME,
  is_deleted: DataTypes.BOOLEAN,
})

Plant.belongsTo(GardenArea, {
  through: "garden_area_id",
  as: "gardenAreas",
  foreignKey: "id",
})

module.exports = Plant
