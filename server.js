const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")
const api = require("./server/api")
const app = express()

// DELETE AFTER DEVELOPMENT
app.use(bodyParser.json({ limit: "5mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }))

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  )

  next()
})
//  ^ DELETE AFTER DEVELOPMENT ^

// app.use('/',api.botanist)
app.use("/", api.plantIdentify)
app.use("/", api.plants)
// app.use('/',api.user)

const port = 3001
app.listen(port, function () {
  console.log(`up and listenes on port ${port}`)
})
