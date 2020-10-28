import { decorate, observable, action } from "mobx";
import axios from 'axios';

class Plants {
    plants=[]

    getPlants = (gardenId) => {
        //axios get request
    }

    addPlant = (plantObj) => {
        // axios post request
    };
}

decorate(Plants, {
    getPlants: action,
    plants: observable,
    addPlant: action,
});

export default new Plants();