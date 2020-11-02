const { Sequelize } = require("sequelize")
const { dbUser, dbPassword, dbHost, dbPort, dbName } = require("../config")
const sequelize = new Sequelize(
  `mysql://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`
)

sequelize
  .authenticate()
  .then(() => {
    console.log("DB connection has been established successfully.")
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err)
  })

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

//Models/tables
db.users = require("./models/User")(sequelize, Sequelize)
db.userRanks = require("./models/UserRank")(sequelize, Sequelize)
db.plants = require("./models/Plant")(sequelize, Sequelize)
db.gardenAreas = require("./models/GardenArea")(sequelize, Sequelize)
db.conditions = require("./models/Condition")(sequelize, Sequelize)
db.diseases = require("./models/Disease")(sequelize, Sequelize)
db.diseaseToPlant = require("./models/DiseaseToPlant")(sequelize, Sequelize)
db.gardenAreaToCondition = require("./models/GardenAreaToCondition")(
  sequelize,
  Sequelize
)
db.plantToCondition = require("./models/PlantToCondition")(sequelize, Sequelize)

//Relations
db.users.belongsTo(db.userRanks, { sourceKey: "rank_id", foreignKey: "id" })
db.gardenAreas.belongsTo(db.users, { sourceKey: "user_id", foreignKey: "id" })
db.gardenAreas.belongsToMany(db.conditions, {
  through: db.gardenAreaToCondition,
  foreignKey: "garden_area_id",
  sourceKey: "id",
})
db.conditions.belongsToMany(db.gardenAreas, {
  through: db.gardenAreaToCondition,
  foreignKey: "condition_id",
  sourceKey: "id",
})
db.plants.belongsTo(db.gardenAreas, {
  foreignKey: "garden_area_id",
  sourceKey: "id",
})
db.plants.belongsToMany(db.diseases, {
  through: db.diseaseToPlant,
  sourceKey: "scientific_name",
  foreignKey: "plant_group",
})
db.diseases.belongsToMany(db.plants, {
  through: db.diseaseToPlant,
  sourceKey: "id",
  foreignKey: "disease_id",
})
db.plants.belongsToMany(db.conditions, {
  through: db.plantToCondition,
  sourceKey: "scientific_name",
  foreignKey: "plant_group",
})
db.conditions.belongsToMany(db.plants, {
  through: db.plantToCondition,
  sourceKey: "id",
  foreignKey: "condition_id",
})

module.exports = db