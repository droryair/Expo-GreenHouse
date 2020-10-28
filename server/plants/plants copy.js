const puppeteer = require("puppeteer")
const cheerio = require("cheerio")

const capitalizeFirstLetterFirstWord = (str) => {
  let splittedWords = str.split(" ")
  let formattedStr = ""
  splittedWords = splittedWords.map((w) => {
    w = w.toLowerCase()
    w = w.charAt(0).toUpperCase() + w.substring(1)
    return w
  })
  formattedStr = splittedWords.join(" ")
  return formattedStr
}

const findPlantByName = async (plantName) => {
  plantName = capitalizeFirstLetterFirstWord(plantName)
  const splitted = plantName.trim().split(" ")
  const plantNameRoute =
    splitted.length > 1 ? plantName.replace(" ", "%2B") : plantName
  const plantNameQuery =
    splitted.length > 1 ? plantName.replace(" ", "%20") : plantName

  const url = `https://www.rhs.org.uk/Plants/Search-Results?form-mode=true&context=l%3Den%26q%3D${plantNameRoute}%26sl%3DplantForm&query=${plantNameQuery}`
  const browser = await puppeteer.launch()
  const searchPage = await browser.newPage()
  await searchPage.goto(url)
  const searchContent = await searchPage.content()
  const s = cheerio.load(searchContent)
  const list = s(
    "#planet_search_list > div > plants-search-result-list > div.posts-list-content > ul > li"
  )
  let results = []
  s(list).each(() => {
    const plant = s(this).find("div.result-details > h4").text()
    console.log(plant)

    let name = s(plant).text()
    name = name.split("(")[0].trim()
    const detailsUrl = `https://www.rhs.org.uk/${s(plant).attr("href")}`

    results.push({ name, detailsUrl })
  })

  console.log(results)
  setTimeout(() => {
    browser.close()
  }, 3000)
}

findPlantByName("ficus lyrata")
//findPlantByName("ficus")

// Scraping detailed page

/* const detailsPage = await browser.newPage()
    await detailsPage.goto(detailsUrl)
    const detailsContent = await detailsPage.content()
    const details = cheerio.load(detailsContent)
    let img = details("#skip-content div.cover-image__img").css(
      "background-image"
    )
    img = img.split("(url")[1].replace(")", "")

    const conditions = []

    // Get sun level condition
    const sunlight = details(
      "#skip-content div.plant-description.clr div.sunlight > ul > li"
    )
    details(sunlight).each(() => {
      const sunLevel = details(this).find("p").text().toLocaleLowerCase()
      conditions.push({ type: "sun level", value: sunLevel })
    })

    // Get direction condition/s
    const aspect = details(sunlight).closest("ul").find("li:nth-child(2)")
    let directions = details(aspect)
      .find("p")
      .clone()
      .children()
      .remove()
      .end()
      .text()
    directions = directions.split("or")
    for (let d of directions) {
      const condition = d.trim().toLocaleLowerCase()
      conditions.push({ type: "direction", value: condition })
    }

    // Get soil type condition/s
    const soilTypes = details(
      "#skip-content div.plant-detailed-description > ul > li p > strong"
    )
      .filter(function () {
        return $(this).text().trim() === "Soil"
      })
      .next()
      .text()
    soilTypes.split(",")
    for (let s of soilTypes) {
      soil = s.toLocaleLowerCase().trim()
      conditions.push({ type: "soil type", "value:": soil })
    }

    // Get moisture type condition/s
    const moisture = details(
      "#skip-content div.plant-detailed-description > ul > li p > strong"
    )
      .filter(function () {
        return $(this).text().trim() === "Moisture"
      })
      .next()
      .text()
    conditions.push({
      type: "moisture",
      "value:": moisture.toLocaleLowerCase(),
    })

    // Get measurements
    const measurements = {}
    const size = details("ul results-size > li")
    details(size).each(() => {
      const key = details(this)
        .find("p strong")
        .text()
        .toLocaleLowerCase()
        .replace(" ", "-")
      const value = details(this)
        .find("p")
        .clone()
        .children()
        .remove()
        .end()
        .text()
    })

    // Get diseases & pests
    const diseases = []
    const pests = details("#skip-content div.how-to.how-to-double-margin > p")
      .filter(function () {
        return $(this).text().trim() === "Pests"
      })
      .next()
      .text()

    const moreTips = [] */
