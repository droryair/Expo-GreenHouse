import { decorate, observable, action, makeObservable, flowResult } from "mobx";
import axios from 'axios';

export default class Plants {
    plantsArr= [
        {
            id: "1",
            name: "daffodil",
            nickname: "difi",
            possibleDiseases:["disease name 1","disease name 2","disease name 3","disease name 4","disease name 5"]
        },
        {
            id: "5",
            name: "Sun Flower",
            nickname:'',
            possibleDiseases:["disease name 6","disease name 1","disease name 8","disease name 10","disease name 16"]

        },{
            id:"6",
            name:"Aloe Vera",
            nickname:'Veevee',
            possibleDiseases:["disease name 4","disease name 7","disease name 12","disease name 3","disease name 15"]

        },{
            id:"9",
            name:"Clover",
            nickname:'Lucky',
            possibleDiseases:["disease name 14","disease name 10","disease name 9","disease name 5","disease name 6"]

        }
    ]
    constructor() {
        makeObservable(this, {
            plantsArr: observable,
            getPlants: action,
            addPlant:action
        })
    }
    
    getPlants = (gardenId) => {
        //axios get request
    }

    addPlant = (plantObj) => {
        // axios post request
    };
}

// makeObservable( {
//     getPlants: action,
//     plants: observable,
//     addPlant: action,
// });

// export default Plants;