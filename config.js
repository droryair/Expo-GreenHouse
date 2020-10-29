const dotenv = require("dotenv")
dotenv.config()
module.exports = {
  dbHost: process.env.DB_HOST,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbPort: process.env.DB_PORT,
  dbName: process.env.DB_NAME,
  plantIdApiKey1: process.env.API_KEY_PLANTID_1,
  jwtSecret: process.env.JWT_SECRET
}