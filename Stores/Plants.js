import { decorate, observable, action, makeObservable } from "mobx";
import axios from 'axios';

export default class Plants {
    plants=[{name:"daffodil", nickname:"difi"}]
    constructor() {
        makeObservable(this, {
            plants: observable,
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