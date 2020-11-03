import { observable, action, makeObservable } from "mobx";
import Axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class User {

    // isLoggedIn;
    // token;
    // id;
    // firstName;
    // lastName;
    // city;
    // email;
    // xp;
    // rank;
    // createdAt;

    constructor() {
        this.isLoggedIn = true;
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
            registerName: action,
            registerCity: action,
            registerEmail: action,
            registration: action,
            login: action
        })
    }

    increaseXP(img) {
        this.images.push(img)
    }
    registerName = async (fullName) => {
        this.firstName = fullName.split(' ')[0]
        this.lastName = fullName.split(' ')[1]
    }
    registerEmail = async (email) => {
        this.email = email
    }
    registerCity = async (city) => {
        this.city = city
    }
    getUserDetails = async (user, token) => {
        this.id = user.id,
            this.city = user.city,
            this.email = user.email,
            this.firstName = user.firstName,
            this.lastName = user.lastName,
            this.rank = user.rankID,
            this.createdAt = user.createdAt,
            this.xp = user.xp
        this.token = token
    }
    registration = async (user) => {
        await fetch('http://192.168.1.11:3001/register', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user
            })
        })
            .then(response => response.json())
            .then(responseJson => {
                this.id = responseJson.id
                this.firstName = responseJson.firstName
                this.lastName = responseJson.lastName
                this.city = responseJson.city
                console.log(responseJson);
                console.log(responseJson.id);
                console.log(responseJson.firstName);
                console.log(responseJson.lastName);
                console.log(responseJson.city);

            })
            .catch(err => {
                console.log(err);
                alert(err)
            })


    }
    login = async (user) => {
        await fetch('http://192.168.1.11:3001/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user
            })
        })
            .then(response => response.json())
            .then(async responseJson => {

                console.log(responseJson);


                if (responseJson.user) {
                    this.id = responseJson.user.id
                    this.email = responseJson.user.email
                    this.firstName = responseJson.user.firstName
                    this.lastName = responseJson.user.lastName
                    this.city = responseJson.user.city
                    this.xp = responseJson.user.xp
                    this.createdAt = responseJson.user.createdAt
                    this.rank = responseJson.user.rank_id
                    this.token = responseJson.token
                    this.isLoggedIn = true
                    await AsyncStorage.setItem('auth-token', responseJson.token)
                }
            })
            .catch(err => {
                console.log(err);
                alert(err)
            })
    }

}
