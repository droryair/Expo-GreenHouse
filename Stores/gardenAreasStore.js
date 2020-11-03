import { decorate, observable, action, makeObservable } from "mobx";
import axios from 'axios';

export default class gardenAreasStore {
    Areas = []
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
    
       constructor() {
           this.currentUser = {
               id: 1
           }
        this.getAreas()
        makeObservable(this, {
            Areas:observable,
            // areas: observable,
            getAreas: action,
            addArea:action
        })
        
    }

    // getAreas = async () => {
    //     await axios.get(`http://http://192.168.1.204:3001/:3001/gardens/${this.currentUser.id}`, function (res) {
    //         console.log(res)
    //         Areas.push(res)
    //     })
    //     //axios get request
    // }

    getAreas = async () => {        
        // fetch(`http://http://192.168.1.204:3001/:3001/gardens/${this.currentUser.id}`, {
        fetch(`http://192.168.1.204:3001/gardens/1`, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(responseJson => {
            console.log(responseJson)
            this.Areas = responseJson
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
