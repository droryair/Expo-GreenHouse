import { decorate, observable, action, makeObservable, flowResult } from "mobx";
import axios from 'axios';

export default class Plants {
    plantsArr = [
        {
            id: "1",
            name: "daffodil",
            nickname: "difi",
            possibleDiseases: ["1"]
        },
        {
            id: "5",
            name: "daffodil",
            nickname: "difi",
            possibleDiseases: ["1"]
        },        {
            id: "6",
            name: "daffodil",
            nickname: "difi",
            possibleDiseases: ["1"]
        },
        {
            id: "9",
            name: "daffodil",
            nickname: "difi",
            possibleDiseases: ["1"]
        }
    ]
    constructor() {
        makeObservable(this, {
            plantsArr: observable,
            getPlants: action,
            addPlant: action
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