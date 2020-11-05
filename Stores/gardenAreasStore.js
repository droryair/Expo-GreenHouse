import { decorate, observable, action, makeObservable } from "mobx";
import axios from 'axios';

export default class gardenAreasStore {
    Areas = []
    currentGardenPlants = []
    constructor(utils, user) {
        this.utils = utils
        this.user = user
        this.currentUser = {
            id: 1
        }
        this.getAreas()
        makeObservable(this, {
            Areas: observable,
            currentGardenPlants: observable,
            getAreas: action,
            getGardensPlants: action,
            addArea: action
        })

    }
    getAreas = async () => {
        await fetch(`${this.utils.serverUrl}:3001/gardens/${this.currentUser.id}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(responseJson => {
                this.Areas = responseJson
            })
            .catch(err => {
                console.log(err);
                alert(err)
            })

    }
    getGardensPlants = async (gardenId) => {
        this.currentGardenPlants = []
        await fetch(`${this.utils.serverUrl}:3001/gardens/allPlants/${gardenId}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson);
                this.currentGardenPlants = responseJson
                return responseJson
            })
            .catch(err => {
                console.log(err);
                alert(err)
            })

    }

    addArea = (areaObj) => {
        // axios post request
    };
}

//Dummy Data
    // areas = [{
    //     type: "Balcony",
    //     nickName: "Eastern Balcony",
    //     imgURL: "https://www.mydomaine.com/thmb/nub3l0qPNB-7w2-dpLu4sC-3AKY=/2849x3347/filters:fill(auto,1)/squarely-5MEFBvXKMVg-unsplash-a9c0fff2205a4da1b73985fb570a4e0a.jpg",
    //     conditions: ["half-sun", "rainy"],
    //     plants: ['1', '5', '6', '9']
    // },{
    //     type: "Kitchen",
    //     nickName: "Kitchen",
    //     imgURL: "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/at%2Farchive%2F050165118856a695f2bd3c66e1f83f3b0f717f01",
    //     conditions: ["Full Shadow", "High humidity"],
    //     plants: ['2', '3', '7', '11']
    // },{
    //     type: "Bathroom",
    //     nickName: "",
    //     imgURL: "",
    //     conditions: ["Full Shadow", "High humidity"],
    //     plants: ['4', '8', '10']
    // }] 