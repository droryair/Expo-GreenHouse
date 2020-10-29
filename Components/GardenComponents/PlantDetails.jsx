import React from 'react';
import { Button, Text, View } from 'react-native';


// this component will be responsible to determine a plant details format
// and rendering them from a given plant details object


export default function PlantDetails(props){
    const plant = props.route.params.plant
    const navigation = props.navigation
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
            <Button title="Menu" onPress={() => navigation.toggleDrawer()} />
            <Text>Plant Details</Text>
        <Text>{plant}</Text>

        </View>
    )
}