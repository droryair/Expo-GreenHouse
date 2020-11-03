import { NavigationHelpersContext } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, ScrollView } from 'react-native';
import { usePlantsStore } from '../../App';
import { Card, Icon } from 'react-native-elements';
import plantIcon from '../../assets/plant.png'

// this component will be responsible to determine a plant details format
// and rendering them from a given plant details object

export default function PlantDetails(props){
    const store         = usePlantsStore(),
          {serverUrl}   = store.utilityStore,
          {plantID}     = props.route.params,
          navigation    = props.navigation,
          [plantData, setPlantData] = useState({}), 
          [conditions, setConditions] = useState([])


    const getPlantDetails = () =>{
        fetch(`${serverUrl}:3001/plant/${plantID}`, {
            method: 'GET'
            })
            .then(response => response.json())
            .then(responseJson => {
                setPlantData(responseJson[0])
                setConditions(responseJson[0].conditions.map(c => ({name:c.name , value:c.value})))
            })
            .catch(err => {
                console.log(err);
                alert(err)
            })
    }

    useEffect(()=>{
        getPlantDetails()
    },[])

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
            <Card>
                <Text>Name: {plantData.nickname}</Text>
                <Text>Scientific Name: {plantData.scientific_name}</Text>
                <Text>Watering Frequency: {plantData.watering_frequency}</Text>
                <Card.Divider />
                <Text style={{ marginBottom: 10 }}>
                </Text>
                <ScrollView>
                    <Text>Growing Conditions</Text>
                    {conditions.map(c => <Text>{c.name} - {c.value} </Text> )}
                </ScrollView>
                <Button
                    title="notify watering"
                    onPress={notifyWatering}
                /> 
            </Card>
            
        </View>
        
    )
}

const styles = StyleSheet.create({
    tinyLogo: {
        width: 50,
        height: 50,
    },
});