const puppeteer = require("puppeteer")
const cheerio = require("cheerio")

const scrapePlantsByConditions = async (conditions) => {
  /*   const url = `https://www.rhs.org.uk/......`
  const searchBrowser = await puppeteer.launch()
  const searchPage = await searchBrowser.newPage()
  await searchPage.goto(url)
  const searchContent = await searchPage.content()
  const $s = cheerio.load(searchContent)
  
  const results = []
  return results */
}
const scrapePlantsByType = async (plantType) => {
  /*   const url = `https://www.rhs.org.uk/......`
  const searchBrowser = await puppeteer.launch()
  const searchPage = await searchBrowser.newPage()
  await searchPage.goto(url)
  const searchContent = await searchPage.content()
  const $s = cheerio.load(searchContent)
  
  const results = []
  return results */
}

module.exports = {
  byConditions: scrapePlantsByConditions,
  byPlantType: scrapePlantsByType,
}
