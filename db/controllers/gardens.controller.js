const db = require("../sequelize")

// Add all methods below for CRUD operations on users, then add them to the export object.
// For example check plants.controller.js
const createGarden = async (garden) => {
  // db.gardenAreas.findOrCreate....
}
const getAllGardens = async (userId) => {
  // db.gardenAreas.findAll....
}
const deleteGarden = async (gardenId) => {
  // db.gardenAreas.destroy....
}

module.exports = { createGarden, getAllGardens, deleteGarden }
