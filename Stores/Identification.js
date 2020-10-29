import {observable, action, makeObservable } from "mobx";
import uuid  from 'react-native-uuid';

export default class Identification {
    images = []
    constructor() {
        makeObservable(this, {
            images:      observable, 
            saveImage:   action,
            printImages: action,
            removeImage: action,


        })
    }

    saveImage(img){
        this.images.push({id:uuid.v4(),img})
    }

    printImages(){
        // console.log(this.images);
    }
    removeImage(id){
        const index = this.images.findIndex(i => i.id === id)
        this.images.splice(index, 1)
    }
    getImages(){
        return this.images
    }
}
