import React from 'react';
import { Text, View } from 'react-native';


//this component will be responsible for creating a new plant in a certain garden area,
// from a giving plant object, and saving that
// new plant to the DB

export default function NewPlant(){

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
            <Text>New Plant</Text>
        </View>
    )
}