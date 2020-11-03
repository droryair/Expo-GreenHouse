import React, { useState } from "react"
import axios from "axios"
import { Text, View, Button } from "react-native"
import { Input } from "react-native-elements"
import Icon from "react-native-vector-icons/FontAwesome"
import { useUtilityStore } from "../../App"
import LoadingState from "../UtilityComponents/LoadingState"
import EmptyState from "../UtilityComponents/EmptyState"

export default function NewPlant() {
  const store = useUtilityStore()
  const [isSearched, setIsSearched] = useState(false)
  const [inputs, setInputs] = useState({ search: "" })
  const [selectedPlant, setSelectedPlant] = useState(null)
  const [searchResults, setSearchResults] = useState([])

  const goBackToSearch = () => {
    setInputs({ ...inputs, search: "" })
    setIsSearched(false)
  }
  const goBackToPlantResults = () => {
    setSelectedPlant(null)
  }

  const handleSearch = async () => {
    try {
      store.utilityStore.showLoadingState()
      const searchResults = await axios.get(
        `${store.utilityStore.serverUrl}/plantForm/${inputs.search}`
      )
      searchResults.data.length
        ? setSearchResults(searchResults.data)
        : store.utilityStore.showEmptyState(
            "Couldn't find any plants with this name. Please change your search and try again.",
            goBackToSearch
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
    const plantName = event.target.innerHTML
    const p = searchResults.find((p) => p.name === plantName)
    try {
      store.utilityStore.showLoadingState()
      const plant = await axios.get(
        `${store.utilityStore.serverUrl}/plantForm/${plantName}/info`,
        { detailsUrl: p.detailsUrl }
      )
      !plant.data.conditions || !plant.data.conditions.length
        ? store.utilityStore.showEmptyState(
            "We're sorry, this plant is currently unsupported.",
            goBackToPlantResults
          )
        : setSelectedPlant(plant.data)
      store.utilityStore.hideLoadingState()
    } catch (err) {
      setSelectedPlant(null)
      store.utilityStore.showSnackBar(
        "Oops, something went wrong. Please try again"
      )
      store.utilityStore.hideLoadingState()

      console.log(err)
    }
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>
        <div className="new-plant-form">
          {isSearched ? (
            selectedPlant === null ? (
              <div className="search-results">
                <Text>
                  Found {searchResults.length} plants that match your search:
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
                  <></>
                )}
              </div>
            ) : (
              <div className="plant-info">
                <Text>details</Text>
                <Button title="Add Plant" />
              </div>
            )
          ) : (
            <div className="search-plant">
              <Input
                placeholder="Plant name"
                value={inputs.search}
                onChangeText={(value) =>
                  setInputs({ ...inputs, search: value })
                }
                leftIcon={<Icon name="search" size={24} color="black" />}
              />
              <Button
                title="Search"
                onPress={handleSearch}
                disabled={inputs.search === ""}
              />
            </div>
          )}
        </div>
      </Text>
    </View>
  )
}
