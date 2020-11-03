import React, { useState } from "react"
import axios from "axios"
import { Text, View, Button } from "react-native"
import { Input } from "react-native-elements"
import Icon from "react-native-vector-icons/FontAwesome"
import LoadingState from "./../UtilityComponents/LoadingState"
import EmptyState from "./../UtilityComponents/EmptyState"
import SnackBar from "./../UtilityComponents/SnackBar"

export default function NewPlant() {
  const [isSearched, setIsSearched] = useState(false)
  const [inputs, setInputs] = useState({ search: "" })
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPlant, setSelectedPlant] = useState(null)
  const [searchResults, setSearchResults] = useState([])
  const [snackBar, setSnackBar] = useState({ msg: "", isShown: false })
  const [emptyState, setEmptyState] = useState({
    msg: "Oops... There's no data to show here, please try again",
    isOpen: true,
    handleGoBack: null,
  })

  const handleSearch = async () => {
    try {
      setIsLoading(true)
      const searchResults = await axios.get(
        `${serverUrl}/plantForm/${inputs.search}`
      )
      setSearchResults(searchResults.data)
      const isEmpty = searchResults.data.length ? false : true
      setEmptyState({
        ...emptyState,
        isShown: isEmpty,
        handleGoBack: goBackToSearch,
      })
      setIsLoading(false)
      setIsSearched(true)
    } catch (err) {
      setSearchResults(null)
      setSnackBar({
        msg: "Oops, something went wrong. Please try again",
        isShown: true,
      })
      setIsLoading(false)
      console.log(err)
    }
  }
  const goBackToSearch = () => {
    setInputs({ ...inputs, search: "" })
    setIsSearched(false)
  }
  const goBackToPlantResults = () => {
    setSelectedPlant(null)
  }

  const handleResultPress = async (event) => {
    const plantName = event.target.innerHTML
    const p = searchResults.find((p) => p.name === plantName)
    try {
      setIsLoading(true)
      const plant = await axios.get(
        `${serverUrl}/plantForm/${plantName}/info`,
        { detailsUrl: p.detailsUrl }
      )
      const isEmpty = plant.data ? false : true
      console.log(plant.data)
      setEmptyState({
        msg: "We're sorry, this plant is currently unsupported.",
        isShown: isEmpty,
        handleGoBack: goBackToPlantResults,
      })
      setIsLoading(false)
    } catch (err) {
      setSelectedPlant(null)
      setSnackBar({
        msg: "Oops, something went wrong. Please try again",
        isOpen: true,
      })
      setIsLoading(false)
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
                {searchResults.length
                  ? searchResults.map((result, index) => (
                      <Button
                        key={`result-${index}`}
                        title={result.name}
                        onPress={handleResultPress}
                      />
                    ))
                  : {
                      /* <EmptyState
                    emptyState={emptyState}
                    setEmptyState={setEmptyState}
                  /> */
                    }}
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
      <SnackBar snackBarMsg={snackBar.msg} visible={snackBar.isShown} />
    </View>
  )
}
