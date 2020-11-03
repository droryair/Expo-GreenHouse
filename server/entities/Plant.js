class Plant {
  constructor(
    scientific_name,
    conditions,
    diseases,
    img_link,
    measurements,
    external_link
  ) {
    this.scientific_name = scientific_name
    this.conditions = conditions
    this.diseases = diseases
    this.img_link = img_link
    this.measurements = measurements
    this.external_link = external_link
  }
}

module.exports = Plant
