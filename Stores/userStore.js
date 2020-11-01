import { observable, action, makeObservable } from "mobx";

export default class User {

    isLoggedIn;
    token;
    id;
    firstName;
    lastName;
    city;
    email;
    xp;
    rank;
    createdAt;

    constructor() {
        this.isLoggedIn = false;
        this.token = '';
        this.id = '';
        this.firstName = '';
        this.lastName = '';
        this.city = '';
        this.email = '';
        this.xp = 0;
        this.rank = '';
        this.createdAt = '';

        makeObservable(this, {
            isLoggedIn: observable,
            id: observable,
            token: observable,
            firstName: observable,
            lastName: observable,
            city: observable,
            email: observable,
            xp: observable,
            rank: observable,
            token: observable,
            increaseXP: action,

        })
    }

    increaseXP(img) {
        this.images.push(img)
    }

    printImages() {
        console.log(this.images)
    }
}
