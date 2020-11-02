module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "users",
    {
      full_name: DataTypes.TEXT,
      email: DataTypes.TEXT,
      password: DataTypes.TEXT,
      city_name: DataTypes.TEXT,
      rank_id: DataTypes.INTEGER,
      xp: DataTypes.INTEGER,
      created_at: DataTypes.TIME,
    },
    {
      timestamps: false,
    }
  )
  return User
}
