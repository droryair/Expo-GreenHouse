import { NavigationContainer } from "@react-navigation/native"
import React from "react"
import { Button, Text, View, TouchableOpacity } from "react-native"
import MyGarden from "../GardenComponents/MyGarden"
import PlantIdentify from "../IdentifyComponents/PlantIdentify"
import { createStackNavigator } from "@react-navigation/stack"
import { get } from "mobx"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { usePlantsStore } from "../../App"
import Backgroundvideo from "../UtilityComponents/BackgroundVideo"
import Logo from "../UtilityComponents/Logo"

export default function GetStarted({ navigation }) {
  const store = usePlantsStore()
  const [authToken, setAuthToken] = React.useState(null)

  React.useEffect(() => {
    const checkedLoggedIn = async () => {
      const token = await AsyncStorage.getItem("auth-token")
      console.log(token)
      if (token !== null) {
        setAuthToken(token)
        await fetch("http://192.168.1.11:3001", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        })
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson)
            let user = {
              city: responseJson.city,
              createdAt: responseJson.createdAt,
              email: responseJson.email,
              firstName: responseJson.firstName,
              id: responseJson.id,
              lastName: responseJson.lastName,
              rankID: responseJson.rankID,
              xp: responseJson.xp,
            }
            store.user.getUserDetails(user, token)
          })
          .catch((err) => {
            console.log(err)
            alert(err)
          })
      }
    }
    checkedLoggedIn()
  }, [])

  const hendlePress = (componentName) => {
    return navigation.navigate(componentName)
  }
  const logout = async () => {
    await AsyncStorage.removeItem("auth-token")
    const allStorage = await AsyncStorage.getAllKeys()
    store.user.isLoggedIn = false
    navigation.navigate("GetStarted")
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Backgroundvideo asset={require("../../assets/leafs_and_drops_01.mov")} />
      <Logo
        asset={require("../../assets/GeenHouse-logo-white.png")}
        styling={{ marginBottom: 200 }}
      />
      {/*   <Button
        title="Get Started"
        color="rgba(0, 0, 0, 0.5)"

        accessibilityLabel="Get Started"
        onPress={() => hendlePress(authToken == null ? "Login" : "Home")}
      /> */}
      <TouchableOpacity
        accessibilityLabel="Get Started"
        onPress={() => hendlePress(authToken == null ? "Login" : "Home")}
      >
        <Text
          style={{
            color: "#fff",
            borderColor: "#fff",
            borderWidth: 2,
            padding: 10,
            borderRadius: 10,
            width: 200,
            fontSize: 20,
            textAlign: "center",
            backgroundColor: "hsla(87, 0%, 0%, 0.77)",
          }}
        >
          Get Started
        </Text>
      </TouchableOpacity>
    </View>
  )
}
