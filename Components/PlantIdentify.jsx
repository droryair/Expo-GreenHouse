import { DrawerItem } from '@react-navigation/drawer';
import * as React from 'react';
import { Button, StyleSheet, View, TouchableOpacity, Text, TextInput} from 'react-native';

export default function PlantIdentify({ navigation }) {
    const [open,setOpen] = React.useState(false)
    const openMenu = function(){
      open ? navigation.openDrawer() : navigation.closeDrawer(); 
      setOpen(!open)
    }
    return (
      <View style={styles.container}>
        <Text style={styles.header}> Identify Plant</Text>
        <TextInput style={styles.searchInput} placeholder="Search By Name"/>
        <TouchableOpacity style={styles.takePicture} >
            <Text style={styles.buttonText}> Take A Picture </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.fromGallery} >
            <Text  style={styles.buttonText}> Upload from Gallery </Text>
        </TouchableOpacity>
        <DrawerItem
              label="Toggle drawer"
              onPress={() => props.navigation.toggleDrawer()}
            />
        <Button title="Toggle drawer" onPress={() => navigation.toggleDrawer()} />
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
    }
})