import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import * as React from 'react';
import {useContext} from 'react';
import { Button, StyleSheet, View, TouchableOpacity, Text, TextInput, Image} from 'react-native';
import { PlantsContext } from '../../App';

  const Results = observer(({ navigation }) => {
    const plantsStore = useContext(PlantsContext)
    const printStore = () =>{
        console.log(toJS(plantsStore.identification.plantData))
        console.log(plantsStore.identification.image)
        console.log(plantsStore.identification.wikiData)
    }
    return ( 
        <View style={styles.container}>
            <Text style={styles.header}> Search Result</Text>
            <TouchableOpacity style={styles.takePicture} onPress={() => navigation.navigate("PlantIdentify")} >
                <Text style={styles.buttonText}> Back </Text>
            </TouchableOpacity>
            <Button title="Menu" onPress={() => navigation.toggleDrawer()} />
            <Button title="Print Store" onPress={printStore} />   
            <Text style={styles.header}>{plantsStore.identification.identified.plant_name}</Text>   
            {/* <Image style={{ width: 100, height: 100 }} source={`${plantsStore.identification.image}`} /> */}
            <Image style={{ width: 100, height: 100 }} source="https://cdn.pixabay.com/photo/2020/02/20/18/58/funnel-web-spider-4865535_960_720.jpg" />
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
        fontSize: 40,
        color:"black",
        marginBottom: 50
    }
})

export default Results