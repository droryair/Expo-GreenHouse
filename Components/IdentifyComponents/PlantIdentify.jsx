import { observer } from 'mobx-react';
import * as React from 'react';
import {useContext} from 'react';
import { Button, StyleSheet, View, TouchableOpacity, Text, Image} from 'react-native';
import { PlantsContext } from '../../App';

const  PlantIdentify = observer(({ navigation }) => {
    const plantsStore = useContext(PlantsContext)
    const handlePress = (componentName) => {
        return (navigation.navigate(componentName))
    }
    return ( 
        <View style={styles.container}>
            <Button title="Menu" onPress={() => navigation.toggleDrawer()} />
            <Text style={styles.header}> Take a picture of your plant</Text>
            <TouchableOpacity style={styles.takePicture} onPress={() => handlePress("Camera")} >
                <Text style={styles.buttonText}> Take A Picture </Text>
            </TouchableOpacity>
            <Text style={styles.plantHeader}>{plantsStore.identification.identified.plant_name}</Text>
            { plantsStore.identification.similarImage 
                ? <Image
                    style={styles.plantImage}
                    source={{
                    uri: plantsStore.identification.similarImage,
                    }}
                    />
                : null
            }

            <Text>{plantsStore.identification.wikiData}</Text>
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
        fontSize: 25,
        color:"black",
        marginBottom: 50
    },
    takePicture:{
        margin:10,
        backgroundColor:'green',
        padding:15,
        borderRadius:5,
    }, 
    buttonText:{
        color:"white"
    },
    plantHeader:{
        fontSize: 20,
    },
    plantImage: {
        width: 200,
        height: 200,
    }
})

export default PlantIdentify