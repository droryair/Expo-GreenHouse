module.exports = (sequelize, DataTypes) => {
  const GardenArea = sequelize.define(
    "garden_areas",
    {
      name:     DataTypes.TEXT,
      user_id:  DataTypes.INTEGER,
    },
    {
      timestamps: false,
    }
  )
  return GardenArea
}
