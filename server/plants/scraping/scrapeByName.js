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

const searchPlantsByName = async (plantName) => {
  plantName = capitalizeFirstLetterFirstWord(plantName)
  const splitted = plantName.trim().split(" ")
  const plantNameRoute =
    splitted.length > 1 ? plantName.replace(" ", "%2B") : plantName
  const plantNameQuery =
    splitted.length > 1 ? plantName.replace(" ", "%20") : plantName

  const url = `https://www.rhs.org.uk/Plants/Search-Results?form-mode=true&context=l%3Den%26q%3D${plantNameRoute}%26sl%3DplantForm&query=${plantNameQuery}`
  const searchBrowser = await puppeteer.launch()
  const searchPage = await searchBrowser.newPage()
  await searchPage.goto(url)
  const searchContent = await searchPage.content()
  const $s = cheerio.load(searchContent)
  const list = $s(
    "#planet_search_list > div > plants-search-result-list > div.posts-list-content > ul>li"
  )
  const results = []
  await $s(list).each(async (i, element) => {
    const plant = $s(element).find("div.result-details > h3 > a")
    let name = $s(plant).text()
    name = name.split("(")[0].trim()
    const detailsUrl = `https://www.rhs.org.uk/${$s(plant).attr("href")}`
    searchBrowser.close()
    results.push({ name, detailsUrl })
  })
  return results
}

module.exports = searchPlantsByName
