import { observable, action, makeObservable, toJS } from "mobx"

export default class Identification {
  constructor(utils) {
    this.utils = utils
    this.plantData = {}
    this.identified = {}
    this.image = ""
    this.wikiData = ""
    this.similarImage = ""
    makeObservable(this, {
      plantData: observable,
      identified: observable,
      image: observable,
      wikiData: observable,
      similarImage: observable,
      searchImage: action,
      clearData: action,
    })
  }
  clearData = async () => {
    this.plantData = {}
    this.identified = {}
    this.image = ""
    this.wikiData = ""
    this.similarImage = ""
  }
  searchImage = async (img) => {
    this.utils.showLoadingState(
      "Identifying your plant!",
      "This might take a few seconds..."
    )
    fetch(`${this.utils.serverUrl}:3001/plantidentify`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        images: [img],
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.plantData = { ...responseJson }
        this.identified = { ...responseJson.suggestions[0] }
        this.image = responseJson.images[0].url
        this.wikiData =
          responseJson.suggestions[0].plant_details.wiki_description.value
        this.similarImage = responseJson.suggestions[0].similar_images[0].url

        !responseJson.length
          ? this.utils.showEmptyState(
              "Couldn't find any match. Please try again.",
              null
            )
          : null
        this.utils.hideLoadingState()
      })
      .catch((err) => {
        console.log(err)
        this.utils.hideLoadingState()
        this.utils.showSnackBar("Oops.. Something went wrong. Please refresh")
        alert(err)
      })
  }
}
