module.exports = (sequelize, DataTypes) => {
  const Plant = sequelize.define(
    "plants",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      nickname: DataTypes.TEXT,
      scientific_name: DataTypes.TEXT,
      garden_area_id: DataTypes.INTEGER,
      img_link: DataTypes.TEXT,
      watering_frequency: DataTypes.INTEGER,
      measurements: DataTypes.JSON,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      is_deleted: DataTypes.BOOLEAN,
    },
    {
      timestamps: false,
    }
  )
  return Plant
}
