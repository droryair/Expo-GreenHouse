import React, { useState } from "react"
import axios from "axios"
import {
  Text,
  View,
  Button,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native"
import { Input, Card } from "react-native-elements"
import Icon from "react-native-vector-icons/FontAwesome"
import { useUtilityStore } from "../../App"
import LoadingState from "../UtilityComponents/LoadingState"
import EmptyState from "../UtilityComponents/EmptyState"
import { observer } from "mobx-react"
import { ScrollView } from "react-native-gesture-handler"

const NewPlant = observer((props) => {
  const store = useUtilityStore()
  const [isSearched, setIsSearched] = useState(false)
  const [inputs, setInputs] = useState({
    search: "",
    nickname: "",
    wateringFrequency: 1,
  })
  const [selectedPlant, setSelectedPlant] = useState(null)
  const [searchResults, setSearchResults] = useState([])
  const serverUrl = `${store.utilityStore.serverUrl}:3001`
  const gardenArea = props.route.params.area
  const [step, setStep] = useState(1)
  const instructions = {
    1: "First, enter your plant to gather information.",
    2: "Now select your plant from the list below.",
    3: "Almost done! Please fill-in the remaining fields in the form.",
  }

  const goBackToSearch = () => {
    setInputs({ ...inputs, search: "" })
    setIsSearched(false)
  }
  const goBackToPlantResults = () => {
    setSelectedPlant(null)
  }

  const handleSearch = async () => {
    try {
      store.utilityStore.showLoadingState(
        "Searching for matching plants!",
        "This might take a few seconds..."
      )
      const results = await axios.get(`${serverUrl}/plantForm/${inputs.search}`)
      if (results.data.length) {
        setSearchResults(results.data)
        setStep(2)
      } else {
        store.utilityStore.showEmptyState(
          "Couldn't find any plants with this name. Please change your search and try again.",
          goBackToSearch()
        )
      }
      store.utilityStore.hideLoadingState()
      setIsSearched(true)
    } catch (err) {
      setSearchResults(null)
      store.utilityStore.showSnackBar(
        "Oops, something went wrong. Please try again"
      )
      store.utilityStore.hideLoadingState()
      console.log(err)
    }
  }

  const handleResultPress = async (event) => {
    try {
      const plantName = event.target.innerHTML
      console.log(plantName)
      const p = searchResults.find((p) => p.name === plantName)
      if (p) {
        store.utilityStore.showLoadingState(
          "Searching for matching plants!",
          "This might take a few seconds..."
        )
        const results = await axios.post(
          `${serverUrl}/plantForm/${plantName}/info`,
          { detailsUrl: p.detailsUrl }
        )
        if (
          results.data.conditions.length ||
          results.data ||
          results.data.diseases.length
        ) {
          setSelectedPlant(results.data)
          setStep(3)
        } else {
          store.utilityStore.showEmptyState(
            "We're sorry, this plant is currently unsupported.",
            goBackToPlantResults
          )
        }
        store.utilityStore.hideLoadingState()
      } else {
        setSelectedPlant(null)
        store.utilityStore.showEmptyState(
          "Couldn't find this plant. Please try again.",
          goBackToPlantResults
        )
        store.utilityStore.hideLoadingState()
      }
    } catch (err) {
      setSelectedPlant(null)
      store.utilityStore.showSnackBar(
        "Oops, something went wrong. Please try again"
      )
      store.utilityStore.hideLoadingState()
      console.log(err)
    }
  }
  const navigateToNewPlant = (plantID, plant) => {
    return navigation.navigate("PlantDetails", { plantID, plant, navigation })
  }
  const savePlantToDB = async () => {
    if (inputs.nickname === "" || inputs.wateringFrequency === "") {
      alert("All fields are required!")
    } else {
      try {
        store.utilityStore.showLoadingState(
          `Saving your plant ${inputs.nickname}!`,
          "This might take a short while..."
        )
        const plant = await axios.post(`${serverUrl}/plant`, {
          nickname: inputs.nickname,
          scientific_name: selectedPlant.scientific_name,
          garden_area_id: gardenArea.id,
          img_link: selectedPlant.img_link,
          watering_frequency: inputs.wateringFrequency,
          conditions: selectedPlant.conditions,
          diseases: selectedPlant.diseases,
          measurements: selectedPlant.measurements,
          external_link: selectedPlant.external_link,
        })
        store.utilityStore.hideLoadingState()
        if (plant.data) {
          store.utilityStore.showSnackBar(
            `Successfully added ${inputs.nickname} to your ${gardenArea.name} garden!`
          )
          setIsSearched(false)
        }
      } catch (err) {
        store.utilityStore.showSnackBar(
          "Oops, something went wrong. Please try again"
        )
        store.utilityStore.hideLoadingState()
        console.log(err)
      }
    }
  }

  return store.utilityStore.loadingState.isShown ? (
    <LoadingState />
  ) : (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <ImageBackground
        source={require("../../assets/background/background2.jpg")}
        style={styles.image}
      />
      <Text style={styles.container}>
        <View style={styles.form}>
          <ScrollView>
            <Text style={styles.title}>Add new plant</Text>
            <Text style={[styles.subtitles, { width: "80%" }]}>
              {instructions[step]}
            </Text>
            <View
              className="search-plant"
              style={{ zIndex: 100, width: "90%" }}
            >
              <Input
                placeholder="Plant name"
                value={inputs.search}
                onChangeText={(value) =>
                  setInputs({ ...inputs, search: value })
                }
                leftIcon={<Icon name="search" size={24} color="black" />}
              />
              <View style={{ width: "80%", marginBottom: 10 }}>
                <Button
                  title="Search"
                  onPress={handleSearch}
                  disabled={inputs.search === ""}
                  color={"#6e963f"}
                />
              </View>
              <Card.Divider />
              {isSearched ? (
                <View className="search-results">
                  {selectedPlant === null ? (
                    <>
                      <Text style={[styles.subtitles, { marginBottom: 10 }]}>
                        Found {searchResults.length} plants that match your
                        search:
                      </Text>
                      {searchResults.length ? (
                        searchResults.map((result, index) => (
                          <View
                            key={`result-${index}`}
                            style={{ marginTop: 10, width: "90%" }}
                          >
                            <Button
                              title={result.name}
                              onPress={handleResultPress}
                              color="hsl(87, 24%, 60%)"
                            />
                          </View>
                        ))
                      ) : (
                        <EmptyState />
                      )}
                    </>
                  ) : (
                    <View className="plant-info">
                      <Text style={styles.topics}>
                        Scientific Name: {selectedPlant.scientific_name}
                      </Text>
                      <Input
                        placeholder="Nickname"
                        value={inputs.nickname}
                        onChangeText={(value) =>
                          setInputs({ ...inputs, nickname: value })
                        }
                      />
                      <Text style={styles.topics}>
                        Garden Area: {gardenArea.name}
                      </Text>
                      <Card.Divider />
                      <View>
                        <Text style={styles.topics}>
                          Should be watered each
                        </Text>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "90%",
                          }}
                        >
                          <Input
                            type="number"
                            placeholder=""
                            value={inputs.wateringFrequency}
                            onChangeText={(value) =>
                              setInputs({ ...inputs, wateringFrequency: value })
                            }
                          />
                          <Text>Days</Text>
                        </View>
                      </View>
                      <Card.Divider />
                      <Image source={{ uri: selectedPlant.img_link }} />
                      <Button title="Add Plant" onPress={savePlantToDB} />
                    </View>
                  )}
                </View>
              ) : (
                <></>
              )}
            </View>
          </ScrollView>
          <Text style={styles.step}>Step {step}/3</Text>
        </View>
      </Text>
    </View>
  )
})
export default NewPlant

const styles = StyleSheet.create({
  /*   header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    backgroundColor: "white",
    paddingLeft: 20,
    zIndex: 1,
  }, */
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
    zIndex: -1,
    opacity: 0.8,
  },
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    display: "flex",
    zIndex: 0,
    margin: 10,
  },
  topics: {
    color: "black",
    fontSize: 18,
  },
  form: {
    display: "flex",
    padding: 10,
    alignItems: "center",
  },
  title: {
    color: "black",
    fontSize: 28,
    fontWeight: "bold",
  },
  step: {
    color: "#6e963f",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitles: {
    color: "#6e963f",
  },
  option: {
    /*     borderWidth: 2,
    borderColor: "black",
    marginTop: 10,
    padding: 5, */
  },
})
