module.exports = (sequelize, DataTypes) => {
  const UserRank = sequelize.define(
    "user_ranks",
    {
      name: DataTypes.TEXT,
      xp_level: DataTypes.INTEGER,
      level_num: DataTypes.INTEGER,
    },
    {
      timestamps: false,
    }
  )
  return UserRank
}
