import {observable, action, makeObservable, toJS } from "mobx";

export default class Identification {
    constructor(utils) {
        this.utils = utils
        this.plantData = {}
        this.identified = {}
        this.image = ""
        this.wikiData = ""
        this.similarImage = ""
        makeObservable(this, {
            plantData:      observable,
            identified:     observable,
            image:          observable,
            wikiData:       observable,
            similarImage:   observable,
            searchImage:    action,
            clearData:      action,
        })
    }
    clearData = async () =>{
        this.plantData = {}
        this.identified = {}
        this.image = ""
        this.wikiData = ""
        this.similarImage = ""
    }
    searchImage = async (img) => {        
        fetch(`${this.utils.serverUrl}:3001/plantidentify`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                },
            body: JSON.stringify({
                images:[img]
            })
        })
        .then(response => response.json())
        .then(responseJson => {
                this.plantData      = {...responseJson}
                this.identified     = {...responseJson.suggestions[0]}
                this.image          = responseJson.images[0].url
                this.wikiData       = responseJson.suggestions[0].plant_details.wiki_description.value 
                this.similarImage   = responseJson.suggestions[0].similar_images[0].url 
        })
        .catch(err => {
            console.log(err);
            alert(err)
        })
        
    }
}
