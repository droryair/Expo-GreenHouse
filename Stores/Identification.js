import {observable, action, makeObservable } from "mobx";

export default class Identification {
    constructor() {
        this.images = []
        this.plantData = {}
        this.switch = true

        makeObservable(this, {
            images:      observable, 
            plantData:   observable,
            switch:      observable,
            searchImage: action,
            toggle:      action,

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
            console.log(responseJson);
            this.plantData = responseJson
        })
        .catch(err => {
            console.log(err);
            alert(err)
        })
        
    }
    toggle(){
        alert(this.switch)
        this.switch = !this.switch
    }
}
