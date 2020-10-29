import React from 'react';
import { Text, View } from 'react-native';

// this component will be responsible to determine a disease format
// and rendering each disease from a given array


export default function RenderDisease(){

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
            <Text>Render Disease</Text>
        </View>
    )
}