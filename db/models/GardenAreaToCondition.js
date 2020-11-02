module.exports = (sequelize, DataTypes) => {
  const GardenAreaToCondition = sequelize.define(
    "garden_areas_to_conditions",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      condition_id: DataTypes.TEXT,
      garden_area_id: DataTypes.TEXT,
    },
    {
      timestamps: false,
    }
  )
  return GardenAreaToCondition
}
