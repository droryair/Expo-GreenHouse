module.exports = (sequelize, DataTypes) => {
  const Disease = sequelize.define(
    "diseases",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      name: DataTypes.TEXT,
      scientific_name: DataTypes.TEXT,
      time_of_year: DataTypes.TEXT,
      treatment: DataTypes.TEXT,
      main_symptoms: DataTypes.TEXT,
      img_link: DataTypes.TEXT,
    },
    {
      timestamps: false,
    }
  )
  return Disease
}
