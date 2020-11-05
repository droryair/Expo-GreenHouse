import * as React from "react"
import { createContext, useContext } from "react"
import { StyleSheet, Text, View, Button } from "react-native"
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer"
import { NavigationContainer } from "@react-navigation/native"
import IdentifyStack from "./Components/IdentifyComponents/IdentifyStack"
import Plants from "./Stores/Plants"
import MyGarden from "./Components/GardenComponents/MyGarden"
import Home from "./Components/GeneralComponents/Home"
import Identification from "./Stores/Identification"
import gardenAreasStore from "./Stores/gardenAreasStore"
import User from "./Stores/userStore"
import Register from "./Components/UserComponents/Register"
import Login from "./Components/UserComponents/Login"
import AsyncStorage from "@react-native-async-storage/async-storage"
import RenderPlant from "./Components/GardenComponents/RenderPlant"
import PlantDetails from "./Components/GardenComponents/PlantDetails"
import GardenStack from "./Components/GardenComponents/GardenStack"
import PushNotifications from "./Components/PushNotifications/PushNotifications"
import NotificationsStack from "./Components/PushNotifications/NotificationsStack"
import BOTanistChat from "./Components/BOTanistComponents/BOTanistChat"
import GetStarted from "./Components/GeneralComponents/GetStarted"
import AuthStack from "./Components/UserComponents/AuthStack"
import { TouchableOpacity } from "react-native-gesture-handler"
import Logout from "./Components/UserComponents/Logout"

import DiseasesStore from "./Stores/DiseasesStore"
import UtilityStore from "./Stores/UtilityStore"
import SnackBar from "./Components/UtilityComponents/SnackBar"
import { observer } from "mobx-react"
import BOTanistStore from "./Stores/BOTanistStore"

const utilityStore = new UtilityStore()
const user = new User(utilityStore)
const identification = new Identification(utilityStore)
const gardenAreas = new gardenAreasStore(utilityStore, user)
const BotanistStore = new BOTanistStore(utilityStore)
const PlantsStore = new Plants()
const Diseases = new DiseasesStore()

const store = {
  PlantsStore,
  identification,
  gardenAreas,
  user,
  Diseases,
  utilityStore,
  BotanistStore
}

export const PlantsContext = createContext(store)
export const PlantsProvider = PlantsContext.Provider
export const usePlantsStore = () => useContext(PlantsContext)
export const useUtilityStore = () => useContext(PlantsContext)

const Drawer = createDrawerNavigator()

console.log(store.user)

const App = observer(() => {
  const logout = async () => {
    await AsyncStorage.removeItem("auth-token")
    const allStorage = await AsyncStorage.getAllKeys()
    console.log(allStorage)
    store.user.isLoggedIn = false
  }

  React.useEffect(() => {
    const checkedLoggedIn = async () => {
      const token = await AsyncStorage.getItem("auth-token")
      console.log(token)
      if (token !== null) {
        await fetch(`${store.utilityStore.serverUrl}:3001`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        })
          .then((response) => response.json())
          .then(async (responseJson) => {
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

  return (
    <>
      <NavigationContainer>
        <PlantsProvider value={store}>
          <>
            <Drawer.Navigator initialRouteName="Home">
              <Drawer.Screen name="Home" component={AuthStack} />
              <Drawer.Screen name="Identify Plant" component={IdentifyStack} />
              <Drawer.Screen name="My Garden" component={GardenStack} />
              <Drawer.Screen name="BOTanist" component={BOTanistChat} />
              <Drawer.Screen
                options={{ headerLeft: () => null }}
                name="Logout"
                component={Logout}
              />
            </Drawer.Navigator>
            <SnackBar />
          </>
        </PlantsProvider>
      </NavigationContainer>
    </>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
})

export default App
