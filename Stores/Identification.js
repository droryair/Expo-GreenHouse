import {observable, action, makeObservable, toJS } from "mobx";

export default class Identification {
    constructor() {
        this.plantData = {}
        this.identified = {}
        this.image = ""
        this.wikiData = ""
        makeObservable(this, {
            plantData:    observable,
            identified:   observable,
            image:        observable,
            wikiData:        observable,
            searchImage: action,
        })
    }
    searchImage = async (img) => {        
        fetch('http://192.168.1.204:3001/plantidentify', {
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
                this.plantData  = {...responseJson}
                this.identified = {...responseJson.suggestions[0]}
                this.image      = responseJson.images[0].url
                this.wikiData   = responseJson.suggestions[0].plant_details.wiki_description.value
        })
        .catch(err => {
            console.log(err);
            alert(err)
        })
        
    }
}
