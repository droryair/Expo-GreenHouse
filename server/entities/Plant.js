class Plant {
  constructor(
    scientificName,
    conditions,
    diseases,
    img_link,
    measurements,
    external_link
  ) {
    this.scientificName = scientificName
    this.conditions = conditions
    this.diseases = diseases
    this.img_link = img_link
    this.measurements = measurements
    this.external_link = external_link
  }
}

module.exports = Plant
