const puppeteer = require("puppeteer")
const cheerio = require("cheerio")
const Disease = require("../entities/Disease")
const Condition = require("../entities/Condition")
const Plant = require("../entities/Plant")

const scrapeDiseaseDetails = async (disease) => {
  const detailsBrowser = await puppeteer.launch()
  const detailsPage = await detailsBrowser.newPage()
  await detailsPage.goto(disease.url)
  const detailsContent = await detailsPage.content()
  const $d = cheerio.load(detailsContent)

  let img = $d(
    "div.carousel__image-container.image-frame.image-frame--no-border.js-carousel-nav-target > div > div"
  ).attr("style")
  img = img ? img.split(`"`)[1] : null

  let details = {}
  let quickFacts = $d(
    "div.section__container div.panel__body > div.content"
  ).html()
  quickFacts = quickFacts.split("<br>")
  for (let fact of quickFacts) {
    let type = fact.split("<strong>")[1].split("</strong>")[0].replace(":", "")
    if (
      type === "Scientific name" ||
      type === "Most active" ||
      type === "Main symptoms"
    ) {
      type = type.toLowerCase().replace(" ", "_")
      const value = fact
        .split("<strong>")[1]
        .split("</strong>")[1]
        .replace("\n", "")
        .trim()
      details[type] = value
    }
  }

  const treatment = $d("#section-4 > div.content-steps p").first().text()
  const newDisease = new Disease(
    d.name,
    details.scientificName,
    details.mainSymptom,
    img,
    treatment
  )
  return newDisease
}

const scrapePlantDetails = async (plantName, detailsUrl) => {
  const detailsBrowser = await puppeteer.launch()
  const detailsPage = await detailsBrowser.newPage()
  await detailsPage.goto(detailsUrl)
  const detailsContent = await detailsPage.content()
  const $d = cheerio.load(detailsContent)

  let img = $d(
    "#skip-content > div.container.clr div.plant-image.g7 div.cover-image__img"
  ).attr("style")
  img = img ? img.split(`"`)[1] : null

  const conditions = []

  // Get sun level condition
  const sunlight = $d(
    "#skip-content div.plant-description.clr div.sunlight > ul > li"
  )
  $d(sunlight).each((i, element) => {
    const sunLevel = $d(element).find("p").text().toLocaleLowerCase().trim()
    conditions.push(new Condition("sun level", sunLevel))
  })

  // Get direction condition/s
  const roomInfo = $d(
    "div.plant-description.clr div.grid.sun.g3 div.plant-detailed-description > ul>li"
  )
  $d(roomInfo).each((i, element) => {
    const type = $d(element).find("strong").text()
    if (type === "Aspect" || type === "Exposure") {
      let value = $d(element).text()
      value = value.split(type)[1].toLowerCase().trim()
      const values = value.includes("or") ? value.split("or") : [value]

      for (let v of values) {
        let condition = {}
        v = v.trim()
        if (type === "Exposure") {
          const isSheltered = v === "exposed" ? false : true
          condition = new Condition("sheltered", isSheltered)
        } else {
          condition = new Condition(type.toLowerCase(), v)
        }

        conditions.push(condition)
      }
    }
  })

  // Get soil type & moisutre condition/s
  const soilInfo = $d(
    "div.plant-description.clr div.grid.soil.g3 > div > div > div.plant-detailed-description.clr > ul > li"
  )
  $d(soilInfo).each((i, element) => {
    const type = $d(element).find("strong").text()
    if (type === "Soil" || type === "Moisture") {
      let value = $d(element).text()
      value = value.split(type)[1].toLowerCase().trim()
      const values = value.includes(",") ? value.split(",") : [value]

      for (let v of values) {
        const condition = new Condition(type.toLowerCase(), v)
        conditions.push(condition)
      }
    }
  })

  // Get measurements
  const measurements = {}
  const sizeInfo = $d("div.plant-description.clr div.grid.size.g3 ul>li")
  $d(sizeInfo).each((i, element) => {
    let key = $d(element).find("strong").text()
    let value = $d(element).text()
    value = value.split(key)[1].toLowerCase().trim()
    key = key.toLowerCase().split(" ").join("-")
    measurements[key] = value
  })

  // Get diseases & pests into diseases array
  const diseases = []
  const pestsInfo = $d(
    `div.how-to.how-to-double-margin > p> strong:contains('Pests')`
  )
    .next()
    .closest("p")
  const diseasesInfo = $d(
    `div.how-to.how-to-double-margin > p> strong:contains('Diseases')`
  )
    .next()
    .closest("p")

  $d(pestsInfo)
    .find("a")
    .each((i, element) => {
      const name = $d(element).text().toLowerCase()
      const url = $d(element).attr("href")
      const pest = { name, url }
      diseases.push(pest)
    })

  $d(diseasesInfo)
    .find("a")
    .each(async (i, element) => {
      const name = $d(element).text().toLowerCase()
      const url = $d(element).attr("href")
      const disease = { name, url }
      diseases.push(disease)
    })
  detailsBrowser.close()

  const newPlant = new Plant(plantName, conditions, diseases, img, measurements)
  return newPlant
}

module.exports = { scrapePlantDetails, scrapeDiseaseDetails }
