import { observer } from 'mobx-react';
import * as React from 'react';
import { Button, StyleSheet, View, TouchableOpacity, Text} from 'react-native';

const  PlantIdentify = observer(({ navigation }) => {
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
        padding:15,
        borderRadius:5,
    }, 
    buttonText:{
        color:"white"
    }
})

export default PlantIdentify