import { observer } from 'mobx-react';
import * as React from 'react';
import {useContext} from 'react';
import { Button, StyleSheet, View, TouchableOpacity, Text, TextInput, Image} from 'react-native';
import { PlantsContext } from '../../App';

const  PlantIdentify = observer(({ navigation }) => {
    const plantsStore = useContext(PlantsContext)
    const handlePress = (componentName) => {
        return (navigation.navigate(componentName))
    }
    return ( 

        <View style={styles.container}>
            <Button title="Menu" onPress={() => navigation.toggleDrawer()} />
            <Text style={styles.header}> Identify Plant</Text>

            <TouchableOpacity style={styles.takePicture} onPress={() => handlePress("Camera")} >
                <Text style={styles.buttonText}> Take A Picture </Text>
            </TouchableOpacity>
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
    },
    takePicture:{
        margin:10,
        backgroundColor:'green',
        width:200,
        height:40,
        borderRadius:5,
    }
})

export default PlantIdentify