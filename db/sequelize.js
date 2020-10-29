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

module.exports = sequelize
