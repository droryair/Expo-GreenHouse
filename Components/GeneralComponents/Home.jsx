import { NavigationContainer } from "@react-navigation/native"
import React from "react"
import {
  Button,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native"
import MyGarden from "../GardenComponents/MyGarden"
import PlantIdentify from "../IdentifyComponents/PlantIdentify"
import { createStackNavigator } from "@react-navigation/stack"
import { get } from "mobx"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { usePlantsStore } from "../../App"
import Logo from "../UtilityComponents/Logo"
import Backgroundvideo from "../UtilityComponents/BackgroundVideo"
// import GardenStack from "./Components/GardenComponents/GardenStack"

//component assumptions:
// there are components named : "MyGarden" ,"IdentifyPlants","Recommended"

// const onPressGetStarted = () => {
//     // <Setup />
// }
// const onPressIdentifyPlants = () => {
//     // <IdentifyPlants/>
// }
// const onPressRecommended = () => {
//     // <Recommended/>
// }

// const Stack = createStackNavigator();

export default function Home({ navigation }) {
  const store = usePlantsStore()

  const hendlePress = (componentName) => {
    return navigation.navigate(componentName)
  }

  const handleGarden = () => {
    return navigation.navigate("MyGarden", { navigate: navigation.navigate })
  }
  const logout = async () => {
    await AsyncStorage.removeItem("auth-token")
    const allStorage = await AsyncStorage.getAllKeys()
    console.log(allStorage)
    store.user.isLoggedIn = false
  }

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
      {/*  <Button
        title="Menu"
        onPress={() => navigation.toggleDrawer()}
        style={styles.menu}
      /> */}
      {store.user.isLoggedIn ? (
        <>
          <TouchableOpacity
            style={styles.button}
            onPress={() => hendlePress("MyGarden")}
            title="Tend Garden"
          >
            <ImageBackground
              source={require("../../assets/background/tend-garden-2.jpg")}
              style={styles.image}
            />
            <Text style={styles.buttonText}>Tend Garden</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => hendlePress("PlantIdentify")}
            title="Identify Plants"
          >
            <ImageBackground
              source={require("../../assets/background/background4.jpg")}
              style={styles.image}
            />
            <Text style={styles.buttonText}>Identify Plants</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => hendlePress("BOTanistChat")}
            title="BOTanistC"
          >
            <ImageBackground
              source={require("../../assets/background/botanist2.jpg")}
              style={styles.image}
            />
            <Text style={styles.buttonText}>Chat with BOTanist</Text>
          </TouchableOpacity>
          {/*   <Button
            onPress={() => hendlePress("MyGarden")}
            title="Tend Garden"
            color="green"
          /> 
          <Button
            onPress={() => hendlePress("PlantIdentify")}
            title="Identify Plants"
            color="green"
          />
           <Button
                        onPress={logout}
                        title="Logout"
                        color="green"
                    /> */}
        </>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Backgroundvideo
            asset={require("../../assets/background/plants-raindrops.mp4")}
          />
          <TouchableOpacity
            accessibilityLabel="Get Started"
            onPress={() => hendlePress("Login")}
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
                backgroundColor: "hsla(87, 0%, 0%, 0.5)",
              }}
            >
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
        /* 
        <>
          <Button
            title="Get Started"
            color="#841584"
            accessibilityLabel="Get Started"
            onPress={() => hendlePress("Login")}
          />
          {/* <Button
                        onPress={logout}
                        title="Logout"
                        color="green"
                    /> }
        </>
       */
      )}
    </View>
  )
}

const styles = StyleSheet.create({
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
  },
  button: {
    display: "flex",
    height: 250,
    justifyContent: "center",
    borderColor: "white",
    borderWidth: 2,
  },
  buttonText: {
    textAlign: "center",
    color: "black",
    textAlign: "center",
    color: "black",
    zIndex: 1,
    fontWeight: "bold",
    fontSize: 30,
    letterSpacing: 2,
    color: "white",
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
  },
})

// {/* <NavigationContainer> */}

// {/* <Text>This is a link:</Text>
// <Stack.Navigator>
//     <Stack.Screen name="MyGarden" component={MyGarden} />
// </Stack.Navigator> */}

// {/* </NavigationContainer> */}
