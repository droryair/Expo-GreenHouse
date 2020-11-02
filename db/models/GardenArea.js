module.exports = (sequelize, DataTypes) => {
  const GardenArea = sequelize.define(
    "garden_areas",
    {
      name: DataTypes.TEXT,
      user_id: DataTypes.INTEGER,
      garden_area_id: DataTypes.INTEGER,
      is_sheltered: DataTypes.BOOLEAN,
    },
    {
      timestamps: false,
    }
  )
  return GardenArea
}
