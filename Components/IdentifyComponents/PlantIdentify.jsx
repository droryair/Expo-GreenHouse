import { observer } from 'mobx-react';
import * as React from 'react';
import {useContext} from 'react';
import { Button, StyleSheet, View, TouchableOpacity, Text, Image, ScrollView} from 'react-native';
import { PlantsContext } from '../../App';
import Logo from '../UtilityComponents/Logo';

const  PlantIdentify = observer(({ navigation }) => {
    const plantsStore = useContext(PlantsContext)
    const handlePress = (componentName) => {
        return (navigation.navigate(componentName))
    }
    return ( 
        <View style={styles.container}>
                {/* <Button title="Menu" onPress={() => navigation.toggleDrawer()} /> */}
                {/* <Text style={styles.header}> Take a picture of your plant</Text> */}
                <View style={styles.header}>
                    <Button
                    title="Menu"
                    onPress={() => navigation.toggleDrawer()}
                    style={styles.menu}
                    color="black"
                    />

                    <Logo
                    asset={require("../../assets/logo/GeenHouse-logo-black.png")}
                    styling={{
                        width: 130,
                        height: 30,
                        marginTop: 10,
                        marginBottom: 10,
                        justifyContent: "center",
                    }}
                    />
                </View>
                <Text style={styles.plantHeader}>{plantsStore.identification.identified.plant_name}</Text>
            <ScrollView>
                {plantsStore.identification.similarImage 
                    ? <Image
                        style={styles.plantImage}
                        source={{
                            uri: plantsStore.identification.similarImage,
                        }}
                        />
                    : null
                }
                <Text style={styles.plantData}>{plantsStore.identification.wikiData}</Text>
            </ScrollView>
            <TouchableOpacity style={styles.takePicture} onPress={() => handlePress("Camera")} >
                <Text style={styles.buttonText}> {plantsStore.identification.identified.plant_name ? "Take A Picture" : "Take Another Picture"}  </Text>
            </TouchableOpacity>
        </View>
    )
})
const styles = StyleSheet.create({
    container:{
        flex: 1,
        display: "flex",
    },
    header:{
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        alignItems: "center",
        backgroundColor: "white",
        paddingLeft: 20,
    },
    takePicture:{
        margin:10,
        backgroundColor:'black',
        padding:15,
        borderRadius:5,
        
    }, 
    buttonText:{
        color:"white",
        backgroundColor:"black", 
        textAlign:"center",
        justifyContent:"center"
    },
    plantHeader:{
        fontSize: 20,
        textAlign:"center",
        fontWeight:"bold"
    },
    plantImage: {
        display: "flex",
        width: "50%",
        marginLeft:"25%",
        height: 200,
    },
    plantData:{
        textAlign:"center",
    }
})

export default PlantIdentify