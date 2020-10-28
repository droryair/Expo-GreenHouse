class Plant {
  constructor(
    scientificName,
    type,
    nickname,
    wateringFrequency,
    conditions,
    diseases,
    imgLink,
    characteristics
  ) {
    this.scientificName = scientificName
    this.type = type
    this.nickname = nickname
    this.wateringFrequency = wateringFrequency
    this.conditions = conditions
    this.diseases = diseases
    this.imgLink = imgLink
    this.characteristics = characteristics
  }
}

module.exports = Plant
