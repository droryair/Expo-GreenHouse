module.exports = (sequelize, DataTypes) => {
  const DiseaseToPlant = sequelize.define(
    "diseases_to_plants",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      disease_id: DataTypes.TEXT,
      plant_group: DataTypes.TEXT,
    },
    {
      timestamps: false,
    }
  )
  return DiseaseToPlant
}
