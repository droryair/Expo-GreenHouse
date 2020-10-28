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
  const page = await browser.newPage()
  await page.goto(url)
  const content = await page.content()
  const $ = cheerio.load(content)
  const list = $(
    "#planet_search_list > div > plants-search-result-list > div.posts-list-content > ul>li"
  )

  let results = []
  $(list).each((i, element) => {
    const plant = $(element).find("div.result-details > h3 > a")
    let name = $(plant).text()
    name = name.split("(")[0].trim()
    const detailsUrl = `https://www.rhs.org.uk/${$(plant).attr("href")}`

    results.push({ name, detailsUrl })
  })
  console.log(results)
  setTimeout(() => {
    browser.close()
  }, 3000)
}

findPlantByName("ficus lyrata")
