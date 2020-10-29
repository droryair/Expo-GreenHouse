import React from 'react';
import { Text, View } from 'react-native';

// this component will be responsible to determine a plant format
// and rendering each plant from a given array


export default function RenderPlant({plants}){
    console.log("render plants")

    // const store = usePlantsStore()
    // const areas = store.gardenAreas.areas
    // const plants = areas[0].plants
    console.log(plants)

// const plants = props.plants
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
            {/* {plants.map((p,i)=><Text key={i}>{p}</Text>)} */}
            <Text>PLANT!</Text>
        </View>
    )
}