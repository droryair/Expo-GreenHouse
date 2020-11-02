module.exports = (sequelize, DataTypes) => {
  const Condition = sequelize.define(
    "conditions",
    {
      name: DataTypes.TEXT,
      value: DataTypes.TEXT,
    },
    {
      timestamps: false,
    }
  )
  return Condition
}
