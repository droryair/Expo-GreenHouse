const express = require("express"),
  router = express.Router(),
  plants = require("./plants")

router.get("/diseases", async (req, res) => {
  try {
    res.end()
  } catch (err) {
    res.send(err)
  }
})
