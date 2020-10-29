import React from 'react';
import { Text, View } from 'react-native';


// this component will be responsible to determine a plant details format
// and rendering them from a given plant details object


export default function PlantDetails(){
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
            <Text>Plant Details</Text>
        </View>
    )
}