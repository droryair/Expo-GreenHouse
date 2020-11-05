import React, { useState } from "react"
import {
  Button,
  View,
  StyleSheet,
  Linking,
  Text,
  ImageBackground,
} from "react-native"
import { ListItem } from "react-native-elements"
import { usePlantsStore, useUtilityStore } from "../../App"
import GardenArea from "../GardenComponents/GardenArea"
import Json from "./BOTanistMessages.json"
import { RadioButton } from "react-native-paper"
import { observer } from "mobx-react"
import * as WebBrowser from "expo-web-browser"
import Logo from "../UtilityComponents/Logo"

// const plants  = controller.getPlantById(1)

const BOTanistChat = observer(({ navigation }) => {
  // export default function BOTanistChat({navigation}) {
  const [currentChat, setCurrentChat] = useState([])
  const [value, setValue] = React.useState("0")
  const store = useUtilityStore()
  const Plantstore = usePlantsStore()
  const areas = Plantstore.gardenAreas.Areas
  const allPlants = Object.values(Plantstore.PlantsStore.plantsArr)
  const user = Plantstore.user
  const userName = user.firstName
  // console.log(user)
  // console.log(user.id)
  // console.log(plantObj)
  const getPlantById = Plantstore.BotanistStore.getPlantObj
  // const allDiseases = Plantstore.Diseases.dummy_diseases // ***change to diseases***
  // console.log(allDiseases)
  // console.log(areas)
  var gardensNames = areas.map((area) => {
    return area.name
  })

  const Welcome = () => {
    const message = Json.welcome.replace("user_name", userName)
    setCurrentChat(...currentChat, [
      <View style={styles.chatBubble}>
        <Text style={{ color: "black", fontSize: 18 }}>{message}</Text>
      </View>,
      <Button
        disabled
        color="#6e963f"
        title="Help me pick a new plant to adopt!"
        onPress={() => suggestions()}
      />,
      <Button
        title="One of my plants is sick..."
        onPress={() => diseases()}
        color="#6e963f"
      />,
    ])
  }

  // const suggestions = () => {
  //     const gardenMessage = Json.suggestions.garden
  //     setCurrentChat(
  //         ...currentChat,
  //         [
  //             <>
  //                 <Text>{gardenMessage}</Text>
  //                 {gardensNames.map((gardenName, i) => {
  //                     return <Button
  //                         key={i}
  //                         title={gardenName}
  //                         onPress={() => suggestionsResultsFunction(gardenName)} />
  //                 })}
  //                 <Button key={34567898765}
  //                     title="None of the above"
  //                     onPress={() => noGarden()}
  //                 />
  //             </>
  //         ])
  // }

  // const noGarden = () => {
  //     const noGarednaMessage = Json.suggestions.none
  //     setCurrentChat([
  //         ...currentChat,
  //         [
  //             <Text key={34875}>{noGarednaMessage}</Text>
  //         ]
  //     ])
  // }

  // const suggestionsResultsFunction = async (gardenName) => {
  //     console.log(garden)
  //     const garden = areas.find(area=>area.name===gardenName)
  //     const resultsMessage = Json.suggestions.results.replace("garden_name", gardenName)
  //     const noMatches = Json.suggestions.no_matches
  //     const gardenConditions = garden.conditions
  //     await console.log("looking for results from the DB")
  //     const results = ["cacti", "herbs"]

  //     setCurrentChat(
  //         ...currentChat,
  //         [
  //             results
  //                 ? <>
  //                     <Text>{resultsMessage}</Text>
  //                     {results.map((result, i) => {
  //                         return (
  //                             <ListItem key={i} >
  //                                 <Text >{result}</Text>
  //                             </ListItem>
  //                         )
  //                     }
  //                     )}
  //                 </>
  //                 : <Text>{noMatches}</Text>
  //         ])
  // }

  const diseases = () => {
    const gardenMessage = Json.diseases.garden
    setCurrentChat(...currentChat, [
      <>
        <View style={styles.chatBubble}>
          <Text>{gardenMessage}</Text>
        </View>
        {gardensNames.map((gardenName, i) => {
          return (
            <Button
              key={i}
              color="#6e963f"
              title={gardenName}
              // onPress={() => plantFunction(gardenName)} />
              onPress={() => getGardenPlants(gardenName)}
            />
          )
        })}
        <Button
          color="#6e963f"
          key={34567898765}
          title="None of the above"
          onPress={() => noGarden()}
        />
      </>,
    ])
  }

  const getGardenPlants = async (gardenName) => {
    const garden = areas.find((area) => area.name === gardenName)
    try {
      store.utilityStore.showLoadingState(
        `Getting your plants in the ${garden} area.`,
        "This might take a few seconds..."
      )
      const result = await Plantstore.gardenAreas.getGardensPlants(garden.id)
      store.utilityStore.hideLoadingState()
      plantFunction(garden)
      // console.log(result)
      // console.log(Plantstore.gardenAreas.currentGardenPlants);
    } catch (err) {
      throw err
      console.log(err)
    }
  }

  const plantFunction = (garden) => {
    const gardenPlants = Plantstore.gardenAreas.currentGardenPlants
    const plantMessage = Json.diseases.plant
    // console.log("message",plantMessage)
    console.log("hi")
    const plantsIDs = garden.plants
    // plantsIDs.map(plantId => {
    //     gardenPlants.push(allPlants.find(p => p.id === plantId))
    // })
    console.log(gardenPlants)
    setCurrentChat(...currentChat, [
      <>
        <View style={styles.chatBubble}>
          <Text>{plantMessage}</Text>
        </View>

        {gardenPlants.map((plant, i) => {
          return (
            <Button
              color="#6e963f"
              key={i}
              title={plant.nickname ? plant.nickname : plant.name}
              onPress={() => diseasesFunctions(plant)}
            />
          )
        })}
      </>,
    ])
  }

  const counter = () => {
    let num = -1
    return ++num
  }
  const diseasesFunctions = async (plant) => {
    // const plantObj = controller.getPlantById(plant.id)
    await getPlantById(plant.id)
    const plantObj = Plantstore.BotanistStore.plantObj
    console.log(plantObj)
    console.log(plantObj[0].diseases)
    const plantName = plant.nickname ? plant.nickname : plant.name
    const diseases = plantObj[0].diseases
    const symptomsMessage = Json.diseases.symptoms.replace(
      "plant_name",
      plantName
    )
    console.log(diseases)
    // let counter = 0
    setCurrentChat(...currentChat, [
      <>
        <Text>{symptomsMessage}</Text>
        <View>
          {diseases.map((disease, i) => {
            return (
              <View key={i}>
                <Button
                  color="#6e963f"
                  title={disease.main_symptoms}
                  onPress={() =>
                    diseasesResultFunction(disease.id, diseases, plantName)
                  }
                />
              </View>
            )
          })}
        </View>
      </>,
    ])
  }

  const diseasesResultFunction = (diseaseId, diseases, plantName) => {
    const chosenDisease = diseases.find((d) => d.id === diseaseId)
    const diseaseName = chosenDisease.name
      ? chosenDisease.name
      : chosenDisease.scientific_name
    const resultsMessage = Json.diseases.results
      .replace("disease_name", diseaseName)
      .replace("plant_name", plantName)

    setCurrentChat(...currentChat, [
      <>
        <Text>{resultsMessage}</Text>
        {/* <Image
                        style={styles.smallLogo}
                        source={chosenDisease.img_link}
                    /> */}
        <Text>
          this is how you can treat {chosenDisease.name} (
          {chosenDisease.scientific_name}): {"\n"}
          {chosenDisease.treatment}
        </Text>
        <Button
          color="#6e963f"
          title={"Read more about" + " " + diseaseName}
          onPress={() =>
            WebBrowser.openBrowserAsync(chosenDisease.external_link)
          }
          style={{ color: "blue" }}
        />
        {/* <Text 
                        onPress={() => Linking.openURL(chosenDisease.external_link)}>
                        Read more about {diseaseName}
                    </Text> */}
      </>,
    ])
  }

  // *radio button
  // diseases=[
  //     id ,
  //     name,
  //     scientific_name ,
  //     time_of_year ,
  //     treatment ,
  //     main_symptoms  ,
  //     img_link  ,
  //     external_link
  // ]

  console.log("chat history", currentChat)
  return (
    <View style={styles.container}>
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
      <ImageBackground
        source={require("../../assets/background/background1.jpeg")}
        style={styles.image}
      />
      {/*  <Button title="Menu" onPress={() => navigation.toggleDrawer()} /> */}

      <Text
        style={{
          color: "white",
          fontSize: 20,
          zIndex: 2,
          textAlign: "center",
          marginTop: 10,
          marginBottom: 10,
          fontWeight: "bold",
        }}
      >
        BOTanist Chat
      </Text>

      {currentChat.length > 0 ? (
        currentChat.map((element, i) => <View key={i}>{element}</View>)
      ) : (
        <Button onPress={Welcome} title="Hi BOTanist! :)" color="#6e963f" />
      )}
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
  },
  chatBubble: {
    marginBottom: 10,
    marginTop: 10,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 20,
    width: "80%",
  },
  smallLogo: {
    width: 70,
    height: 70,
  },
  container: {
    flex: 1,
    display: "flex",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    alignItems: "center",
    backgroundColor: "white",
    paddingLeft: 20,
    zIndex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
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

export default BOTanistChat
