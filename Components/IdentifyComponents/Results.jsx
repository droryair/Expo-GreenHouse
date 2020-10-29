import * as React from 'react';
import {useContext} from 'react';
import { Button, StyleSheet, View, TouchableOpacity, Text, TextInput, Image} from 'react-native';
import { PlantsContext } from '../../App';

export default function Results({ navigation }) {
    const plantsStore = useContext(PlantsContext)
    
    return ( 
        <View style={styles.container}>
            <Button title="Menu" onPress={() => navigation.toggleDrawer()} />
            <Text style={styles.header}> Search Result</Text>
            <TouchableOpacity style={styles.takePicture} onPress={() => navigation.navigate("PlantIdentify")} >
                <Text style={styles.buttonText}> Back </Text>
            </TouchableOpacity>
            {console.log(plantsStore.identification.plantData)}
            <Text style={styles.header}> {plantsStore.identification.plantData.id}</Text>
            
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center' 
    },
    header:{
        fontSize: 40,
        color:"black",
        marginBottom: 50
    }
})