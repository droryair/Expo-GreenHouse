import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import * as React from 'react';
import {useContext} from 'react';
import { Button, StyleSheet, View, TouchableOpacity, Text, TextInput, Image} from 'react-native';
import { PlantsContext } from '../../App';

  const Results = observer(({ navigation }) => {
    const plantsStore = useContext(PlantsContext)
    const modifiedPlantData = toJS(plantsStore.identification.plantData)
    const printStore = () =>{
        console.log(toJS(plantsStore.identification.plantData))
    }
    return ( 
        <View style={styles.container}>
            <Text style={styles.header}> Search Result</Text>
            <TouchableOpacity style={styles.takePicture} onPress={() => navigation.navigate("PlantIdentify")} >
                <Text style={styles.buttonText}> Back </Text>
            </TouchableOpacity>
            <Button title="Menu" onPress={() => navigation.toggleDrawer()} />
            <Button title="Print Store" onPress={printStore} />
            
            <Text style={styles.header}>{toJS(plantsStore.identification.plantData).id}</Text>
            

        </View>
    )
})
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

export default Results