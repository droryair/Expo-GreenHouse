import { decorate, observable, action, makeObservable } from "mobx";
import axios from 'axios';
export default class BOTanistStore {
    plantObj = {}
    constructor(utils) {
        this.utils = utils
        makeObservable(this, {
            plantObj: observable,
            getPlantObj: action
        })
    }


    getPlantObj = async (plantId) => {
        // fetch(`/plant/:${plantId}`)
        await fetch(`${this.utils.serverUrl}:3001/plant/${plantId}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson)
                this.plantObj = responseJson
            })
            .catch(err => {
                console.log(err);
                alert(err)
            })

    }
}