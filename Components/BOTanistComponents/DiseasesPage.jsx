import React from 'react';
import { Text, View } from 'react-native';

// this component will be responsible for rendering diseases page as a result 
// of conversation between user and the BOTanist
// and calling the "RenderDisease" component with the possible diseases array


export default function DiseasesPage(){

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
            <Text>Diseases Page</Text>
        </View>
    )
}