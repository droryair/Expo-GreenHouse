


import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { usePlantsStore } from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Logout({ navigation }) {

    const store = usePlantsStore()

    // const logout = async () => {
    //     await AsyncStorage.removeItem('auth-token')
    //     const allStorage = await AsyncStorage.getAllKeys()
    //     console.log(allStorage);
    //     store.user.isLoggedIn = false
    //     navigation.navigate('GetStarted')
    // }
    useEffect(() => {
        const logout = async () => {
            await AsyncStorage.removeItem('auth-token')
            const allStorage = await AsyncStorage.getAllKeys()
            console.log(allStorage);
            store.user.isLoggedIn = false
            navigation.navigate('AuthStack')

        }
        logout()
    }, [])

    return null
}