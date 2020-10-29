import React from 'react';
import { Text, View } from 'react-native';

// this component wil be responsible for the BOTanist bubble, onPress, 
//and calling the 'BOTanistChat' component


export default function BOTanistBubble(){

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
            <Text>BOTanist Bubble</Text>
        </View>
    )
}