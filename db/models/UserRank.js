module.exports = (sequelize, DataTypes) => {
  const UserRank = sequelize.define("user_ranks", {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    name: DataTypes.TEXT,
    xp_level: DataTypes.INTEGER,
    level_num: DataTypes.INTEGER,
  })
  return UserRank
}
