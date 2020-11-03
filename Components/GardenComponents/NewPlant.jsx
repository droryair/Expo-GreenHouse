import React, { useState } from "react"
import axios from "axios"
import { Text, View, Button, Image } from "react-native"
import { Input } from "react-native-elements"
import Icon from "react-native-vector-icons/FontAwesome"
import { useUtilityStore } from "../../App"
import LoadingState from "../UtilityComponents/LoadingState"
import EmptyState from "../UtilityComponents/EmptyState"
import { observer } from "mobx-react"

const NewPlant = observer(() => {
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
  const gardenArea = { id: 19, name: "Bedroom" }

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
      results.data.length
        ? setSearchResults(results.data)
        : store.utilityStore.showEmptyState(
            "Couldn't find any plants with this name. Please change your search and try again.",
            goBackToSearch()
          )
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
        results.data.conditions.length ||
        results.data ||
        results.data.diseases.length
          ? setSelectedPlant(results.data)
          : store.utilityStore.showEmptyState(
              "We're sorry, this plant is currently unsupported.",
              goBackToPlantResults()
            )
        store.utilityStore.hideLoadingState()
      } else {
        setSelectedPlant(null)
        store.utilityStore.showEmptyState(
          "Couldn't find this plant. Please try again.",
          goBackToPlantResults()
        )
        store.utilityStore.hideLoadingState()
        console.log(err)
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

  const savePlantToDB = async () => {
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
      console.log(plant.data)
      store.utilityStore.hideLoadingState()
      plant.data
        ? store.utilityStore.showSnackBar(
            `Successfully added ${inputs.nickname} to your ${gardenArea.name} garden!`
          )
        : null
    } catch (err) {
      store.utilityStore.showSnackBar(
        "Oops, something went wrong. Please try again"
      )
      store.utilityStore.hideLoadingState()

      console.log(err)
    }
  }

  return store.utilityStore.loadingState.isShown ? (
    <LoadingState />
  ) : (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>
        <div className="new-plant-form">
          <div className="search-plant">
            <Input
              placeholder="Plant name"
              value={inputs.search}
              onChangeText={(value) => setInputs({ ...inputs, search: value })}
              leftIcon={<Icon name="search" size={24} color="black" />}
            />
            <Button
              title="Search"
              onPress={handleSearch}
              disabled={inputs.search === ""}
            />
            {isSearched ? (
              <div className="search-results">
                {selectedPlant === null ? (
                  <>
                    <Text>
                      Found {searchResults.length} plants that match your
                      search:
                    </Text>
                    {searchResults.length ? (
                      searchResults.map((result, index) => (
                        <Button
                          key={`result-${index}`}
                          title={result.name}
                          onPress={handleResultPress}
                        />
                      ))
                    ) : (
                      <EmptyState />
                    )}
                  </>
                ) : (
                  <div className="plant-info">
                    <Text>
                      Scientific Name: {selectedPlant.scientific_name}
                    </Text>
                    <Input
                      placeholder="Nickname"
                      value={inputs.nickname}
                      onChangeText={(value) =>
                        setInputs({ ...inputs, nickname: value })
                      }
                    />
                    <Text>Garden Area: {gardenArea.name}</Text>
                    <div>
                      <Text>Should be watered each</Text>
                      <Input
                        type="number"
                        placeholder=""
                        value={inputs.wateringFrequency}
                        onChangeText={(value) =>
                          setInputs({ ...inputs, wateringFrequency: value })
                        }
                      />
                      <Text>Days</Text>
                    </div>
                    <Image source={selectedPlant.img_link} />
                    <Button title="Add Plant" onPress={savePlantToDB} />
                  </div>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </Text>
    </View>
  )
})
export default NewPlant
