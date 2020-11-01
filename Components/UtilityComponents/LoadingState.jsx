import React from 'react';
import { Text, View } from 'react-native';

// this component will be responsible to render a loading gif, for every
// async- operation that includes rendering data.


export default function LoadingState(){

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
            <Text>Loading State</Text>
        </View>
    )
}