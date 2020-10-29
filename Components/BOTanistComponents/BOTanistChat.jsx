import React from 'react';
import { Text, View } from 'react-native';


// this component will be responsible for the actual conversation of the BOTanist with the user;
// Q&A, gathering data, and rendering results


export default function BOTanistChat(){

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
            <Text>BOTanist Chat</Text>
        </View>
    )
}