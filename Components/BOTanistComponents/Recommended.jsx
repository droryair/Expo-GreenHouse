import React from 'react';
import { Text, View } from 'react-native';


// this component will be responsible for rendering plants recommendations as a result 
// of conversation between user and the BOTanist
// and calling the "RenderPlant" component (from the "GardenComponents" folder)
// with the recommendations array



export default function Recommended(){

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
            <Text>Recommended</Text>
        </View>
    )
}