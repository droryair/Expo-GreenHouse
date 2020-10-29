import * as React from 'react';
import { Button, StyleSheet, View, TouchableOpacity, Text, TextInput, Image} from 'react-native';
import { usePlantsStore } from '../../App';

export default function PlantIdentify({ navigation }) {
    const plantsStore = usePlantsStore()
    const handlePress = (componentName) => {
        return (navigation.navigate(componentName))
    }
    const removeFromImages = (e) =>{
        const {id} = e.target
        plantsStore.identification.removeImage(id)
    }

    
    return (
      <View style={styles.container}>
        <Button title="Menu" onPress={() => navigation.toggleDrawer()} />
        <Text style={styles.header}> Identify Plant</Text>
        <TextInput style={styles.searchInput} placeholder="Search By Name"/>

        <TouchableOpacity style={styles.takePicture} onPress={() => handlePress("Camera")} >
            <Text style={styles.buttonText}> Take A Picture </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.fromGallery}  onPress={() => handlePress("FromGallery")}>
            <Text  style={styles.buttonText}> Upload from Gallery </Text>
        </TouchableOpacity>

        <View style={styles.imagesContainer}>
            {plantsStore.identification.getImages().map(i =>(
                <View key={i.id}style={styles.imageWrapper}>
                    <Image source={i.image} style={styles.image} alt="captured-image"/>
                    <TouchableOpacity style={styles.removeImageButton} id={i.id} onPress={removeFromImages}>
                        <Text  style={styles.removeImageText}> x </Text>
                    </TouchableOpacity>
                </View>
            ))}
        </View>
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
    },
    searchInput:{
        borderWidth:1,
        borderColor:"black",
        padding:10,
        borderRadius:10,
    },
    takePicture:{
        margin:10,
        backgroundColor:'green',
        width:200,
        height:40,
        borderRadius:5,
    },
    fromGallery:{
        margin:10,
        backgroundColor:'green',
        width:200,
        height:40,
        borderRadius:5,
    },
    buttonText:{
        color:"white",
        textAlign:"center", 
        padding:5
    },
    imagesContainer:{
        flexDirection:"row"
    },
    image:{
        width: 100, 
        height:100, 
        margin: 5    
    },
    removeImageButton:{
        padding: 20,
        backgroundColor:"red", 
    },
    removeImageText:{
        color:"white", 
    }
})