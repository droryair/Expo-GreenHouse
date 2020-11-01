import React from 'react';
import { Text, View } from 'react-native';

// this component will be responsible to render a message for the user in case it got 
// to a "dead end", in the app, as well as rendering a "Home" button 

export default function EmptyState(){

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
            <Text>Empty State</Text>
        </View>
    )
}