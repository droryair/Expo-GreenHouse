import React from "react"
import { Button, Text, View, StyleSheet, ImageBackground } from "react-native"
import { inject, observer, PropTypes } from "mobx-react"
import { PlantsProvider, usePlantsStore } from "../../App"
import { Card, ListItem, Icon } from "react-native-elements"
import GardenArea from "../GardenComponents/GardenArea"
import { createStackNavigator } from "@react-navigation/stack"
import RenderPlant from "./RenderPlant"
import { NavigationContainer } from "@react-navigation/native"
import { ScrollView } from "react-native-gesture-handler"
import NewArea from "./NewArea"
import Logo from "../UtilityComponents/Logo"
import LoadingState from "../UtilityComponents/LoadingState"
import EmptyState from "../UtilityComponents/EmptyState"

//COMPONENT RESPONSIBILITIES
// this component will be responsible for rendering garden management page,
// and calling the "GardenArea" component with all of the existing garden areas array
// component assumptions:
// there is a store named "plants"
//there is a component named "AddPlant"
// const Stack = createStackNavigator();
// const Drawer = createDrawerNavigator();
export default function MyGarden({ navigation }) {
  const store = usePlantsStore()
  const areas = store.gardenAreas.Areas
  const onPressAddArea = () => {
    ;<NewArea />
  }

  return store.utilityStore.loadingState.isShown ? (
    <LoadingState />
  ) : (
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
      <ScrollView>
        <Text style={styles.title}>My Gardens</Text>
        {/* <Button
                onPress={onPressAddArea}
                title="+ | New Garden Area"
                color="green"
            /> */}
        {/* <View */}
        {/* style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: 'row'
                }}> */}
        {store.utilityStore.emptyState.isShown && !areas.length ? (
          <EmptyState />
        ) : (
          areas.map((a, i) => {
            return <GardenArea key={i} area={a} navigation={navigation} />
          })
        )}
        {/* </View> */}
      </ScrollView>
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
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
    marginTop: 20,
    marginBottom: 10,
    letterSpacing: 2,
  },
})
