const db = require("../sequelize")
const { conditions } = require("../sequelize")

// Add all methods below for CRUD operations on users, then add them to the export object.
// For example check plants.controller.js
const getDiseaseById = async (diseaseId) => {
  // db.diseases.findAll....
}
const getDiseasesByPlant = async (plantId) => {
  // db.diseases.findAll....
}

module.exports = { getDiseaseById, getDiseasesByPlant }
