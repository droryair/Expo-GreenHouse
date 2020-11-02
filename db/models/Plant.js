module.exports = (sequelize, DataTypes) => {
  const Plant = sequelize.define(
    "plants",
    {
      nickname: DataTypes.TEXT,
      scientific_name: DataTypes.TEXT,
      garden_area_id: DataTypes.INTEGER,
      img_link: DataTypes.TEXT,
      watering_frequency: DataTypes.INTEGER,
      measurements: DataTypes.JSON,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      external_link: DataTypes.TEXT,
    },
    {
      timestamps: false,
    }
  )
  return Plant
}
