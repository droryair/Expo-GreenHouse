import { NavigationHelpersContext } from '@react-navigation/native';
import React from 'react';
import { Button, Text, View } from 'react-native';
import { usePlantsStore } from '../../App';

// this component will be responsible to determine a plant details format
// and rendering them from a given plant details object





export default function PlantDetails(props){
    const Plantstore = usePlantsStore()
    const allPlants = Object.values(Plantstore.PlantsStore.plantsArr)
    const plantID = props.route.params.plantID
    const navigation = props.navigation
    const plant = allPlants.find(p=>p.id===plantID)
    console.log(plant)

    const notifyWatering=()=>{
        navigation.navigate('ScheduleNotifications', {plant})
    }




    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
            <Button title="Menu" onPress={() => navigation.toggleDrawer()} />

            <Text>Plant Details</Text>
            <Text>{plant.nickname? plant.nickname : plant.name}</Text>
            <Button
                title="notify watering"
                onPress={notifyWatering}
            />
        </View>
    )
}