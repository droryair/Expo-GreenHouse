module.exports = (sequelize, DataTypes) => {
  const PlantToCondition = sequelize.define(
    "plants_to_conditions",
    {
      condition_id: DataTypes.TEXT,
      plant_group: DataTypes.TEXT,
    },
    {
      timestamps: false,
    }
  )
  return PlantToCondition
}
