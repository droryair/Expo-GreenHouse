import React from 'react';
import { Text, View } from 'react-native';

//this component will be responsible for creating a new garden area,
// from a giving garden object, and saving that
// new area to the DB


export default function NewArea(){

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
            <Text>New Area</Text>
        </View>
    )
}