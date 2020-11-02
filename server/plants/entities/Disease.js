class Disease {
  constructor(
    name,
    scientific_name,
    main_symptoms,
    most_active,
    img_link,
    treatment
  ) {
    this.name = name
    this.scientific_name = scientific_name
    this.main_symptoms = main_symptoms
    this.img_link = img_link
    this.treatment = treatment
    this.time_of_year = most_active
  }
}

module.exports = Disease
