module.exports = (sequelize, DataTypes) => {
  const Condition = sequelize.define(
    "conditions",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      name: DataTypes.TEXT,
      value: DataTypes.TEXT,
    },
    {
      timestamps: false,
    }
  )
  return Condition
}
