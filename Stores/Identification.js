import {observable, action, makeObservable } from "mobx";

export default class Identification {
    constructor() {
        this.images = []
        this.plantData = {}
        makeObservable(this, {
            images:      observable, 
            plantData:   observable, 
            searchImage: action
        })
    }
    searchImage = async  (img) => {
        try{
            let response  = await fetch('http://192.168.1.204:3001/plantidentify', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify({
                    images:[img]
                })
            });
            console.log("response" ,response);
            this.plantData = response
        }
        catch(err){
            console.log("error");
            alert( err)
        }
    }
}
