import { NavigationHelpersContext } from "@react-navigation/native"
import React, { useEffect, useState } from "react"
import {
  Button,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  ImageBackground,
} from "react-native"
import { usePlantsStore } from "../../App"
import { Card, Icon } from "react-native-elements"
import plantIcon from "../../assets/plant.png"

// this component will be responsible to determine a plant details format
// and rendering them from a given plant details object

export default function PlantDetails(props){
    const {plant}       = props.route.params
    const store         = usePlantsStore(),
          {serverUrl}   = store.utilityStore,
          {plantID}     = props.route.params,
          navigation    = props.navigation,
          [plantData, setPlantData] = useState({}), 
          [conditions, setConditions] = useState([])


  const getPlantDetails = () => {
    fetch(`${serverUrl}:3001/plant/${plantID}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setPlantData(responseJson[0])
        setConditions(
          responseJson[0].conditions.map((c) => ({
            name: c.name,
            value: c.value,
          }))
        )
      })
      .catch((err) => {
        console.log(err)
        alert(err)
      })
  }

  useEffect(() => {
    getPlantDetails()
  }, [])

  const notifyWatering=()=>{
    navigation.navigate('ScheduleNotifications', {plant})
}

  return (
    <View style={styles.container}>
      <ImageBackground
        source={
          plantData.img_link
            ? { uri: plantData.img_link }
            : require("../../assets/background/background2.jpg")
        }
        style={styles.image}
      />
      <View style={styles.card}>
        <ScrollView>
          <Text style={styles.title}>{plantData.nickname}</Text>
          {/* {plantData.img_link ? (
            <Image
              style={styles.tinyLogo}
              source={{ uri: plantData.img_link }}
            />
          ) : null} */}
          <Card.Divider />
          <Text>
            <Text style={styles.header}>Scientific Name: </Text>
            {plantData.scientific_name}
          </Text>
          <Text>
            <Text style={styles.header}>- Watering </Text>
            Every {plantData.watering_frequency} days
          </Text>
          <Text>
            <Text style={styles.header}>- Last watered at: </Text>
            {plantData.updated_at}
          </Text>
          <Text>
            <Text style={styles.header}>- Soil checked at: </Text>
            {plantData.updated_at}
          </Text>
          <Card.Divider />
          <ScrollView>
            <Text>
              <Text style={styles.header}>Growing Conditions: </Text>
            </Text>
            {conditions.map((c, i) => (
              <Text key={i}>
                <Text style={styles.header}>- {c.name}: </Text> {c.value}
              </Text>
            ))}
          </ScrollView>
        </ScrollView>
        <Button title="notify watering" onPress={notifyWatering} />
      </View>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    justifyContent: "center",
  },
  card: {
    flex: 1,
    display: "flex",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    backgroundColor: "white",
    zIndex: 1,
    marginTop: 280,
  },
  tinyLogo: {
    width: "50%",
    height: 150,
    marginLeft: "25%",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6e963f",
  },
  image: {
    flex: 1,
    display: "flex",
    resizeMode: "cover",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    flex: 1,
    zIndex: 0,
    opacity: 0.8,
  },
})
