import {observable, action, makeObservable, toJS } from "mobx";

export default class Identification {
    constructor() {
        this.plantData = {}

        makeObservable(this, {
            plantData:   observable,
            searchImage: action,
        })
    }
    searchImage = async  (img) => {        
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
            // this.plantData.imagesUrl = responseJson.images[0].url
            this.plantData = {...responseJson.suggestion}
            // console.log(this.plantData);
        })
        .catch(err => {
            console.log(err);
            alert(err)
        })
        
    }
}
