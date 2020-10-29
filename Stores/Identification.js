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
        console.log(img.length);
    }

    printImages(){
        // console.log(this.images);
    }

    getImages(){
        return this.images
    }
}
