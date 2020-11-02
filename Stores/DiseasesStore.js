import { decorate, observable, action, makeObservable } from "mobx";
import axios from 'axios';

export default class DiseasesStore {
    diseases = []
    dummy_diseases=[
        {
            id:"1",
            name:"disease name 1",
            time_of_year:'winter',
            treatment:"water your plant consistantly",
            main_symptoms:"dry leaves",
            img_link:"",
            external_link:""
        }
    ]

    constructor() {
        makeObservable(this, {
            diseases: observable,
            dummy_diseases:observable,
            getDiseases:action
        })
    }
    
    
    getDiseases=()=>{
        //axios get ('/diseases')
    }


}
