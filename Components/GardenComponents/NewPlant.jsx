import React, { useState } from "react"
import axios from "axios"
import { Text, View, Button } from "react-native"
import { Input } from "react-native-elements"
import Icon from "react-native-vector-icons/FontAwesome"
import LoadingState from "./../UtilityComponents/LoadingState"
import EmptyState from "./../UtilityComponents/EmptyState"

export default function NewPlant() {
  const [isSearched, setIsSearched] = useState(false)
  const [inputs, setInputs] = useState({ search: "" })
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPlant, setSelectedPlant] = useState(null)
  const [searchResults, setSearchResults] = useState([])
  const serverUrl = "http://10.0.0.4:3001"

  const handleSearch = async () => {
    try {
      setIsLoading(true)
      const searchResults = await axios.get(
        `${serverUrl}/plantForm/${inputs.search}`
      )
      setSearchResults(searchResults.data)
      setIsLoading(false)
      setIsSearched(true)
    } catch (err) {
      console.log(err)
    }
  }

  const handleResultPress = async (event) => {
    const plantName = event.target.innerHTML
    const p = searchResults.find((p) => p.name === plantName)
    console.log(p)
    const plant = await axios.get(
      `${serverUrl}/plantForm/${plantName}/info`,
      p.detailsUrl
    )
    setSelectedPlant(plant.data ? plant.data : null)
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
          {isLoading ? (
            <LoadingState />
          ) : isSearched ? (
            selectedPlant ? (
              <div className="plant-info">
                plant details
                <Button title="Add Plant" />
              </div>
            ) : (
              <div className="search-results">
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
