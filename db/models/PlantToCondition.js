module.exports = (sequelize, DataTypes) => {
  const PlantToCondition = sequelize.define(
    "plants_to_conditions",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      condition_id: DataTypes.TEXT,
      plant_group: DataTypes.TEXT,
    },
    {
      timestamps: false,
    }
  )
  return PlantToCondition
}
