module.exports = (sequelize, DataTypes) => {
  const DiseaseToPlant = sequelize.define(
    "diseases_to_plants",
    {
      disease_id: DataTypes.TEXT,
      plant_group: DataTypes.TEXT,
    },
    {
      timestamps: false,
    }
  )
  return DiseaseToPlant
}
