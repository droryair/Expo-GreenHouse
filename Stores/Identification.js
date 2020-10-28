import {observable, action, makeObservable } from "mobx";

export default class Identification {
    images = []
    constructor() {
        makeObservable(this, {
            images:observable, 
            saveImage:action,
            printImages:action

        })
    }

    saveImage(img){
        this.images.push(img)
    }

    printImages(){
        console.log(this.images);
    }
}
