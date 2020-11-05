import { observer } from "mobx-react"
import * as React from "react"
import { useContext } from "react"
import {
  Button,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  ImageBackground,
} from "react-native"
import { PlantsContext, useUtilityStore } from "../../App"
import Logo from "../UtilityComponents/Logo"
import LoadingState from "../UtilityComponents/LoadingState"
import EmptyState from "../UtilityComponents/EmptyState"

const PlantIdentify = observer(({ navigation }) => {
  const store = useUtilityStore()
  const plantsStore = useContext(PlantsContext)
  const handlePress = (componentName) => {
    return navigation.navigate(componentName)
  }
  return store.utilityStore.loadingState.isShown ? (
    <LoadingState />
  ) : (
    <View style={styles.container}>
      <View style={styles.headerMenu}>
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
      {/*   <Button title="Menu" onPress={() => navigation.toggleDrawer()} /> */}
      <Text style={styles.header}> Take a picture of your plant</Text>
      <TouchableOpacity
        style={styles.takePicture}
        onPress={() => handlePress("Camera")}
      >
        <Text style={styles.buttonText}>Take A Picture</Text>
      </TouchableOpacity>
      {plantsStore.identification.identified === {} &&
      store.utilityStore.emptyState.isShown ? (
        <EmptyState />
      ) : (
        <>
          <Text style={styles.plantHeader}>
            {plantsStore.identification.identified.plant_name}
          </Text>
          <ScrollView style={styles.scroll}>
            {plantsStore.identification.similarImage ? (
              <Image
                style={styles.plantImage}
                source={{
                  uri: plantsStore.identification.similarImage,
                }}
              />
            ) : null}
            <Text
              style={{
                marginBottom: 20,
                color: "white",
                padding: 20,
              }}
            >
              {plantsStore.identification.wikiData}
            </Text>
          </ScrollView>
        </>
      )}
    </View>
  )
})
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
  },
  scroll: {
    padding: 20,
    backgroundColor: "hsla(87, 0%, 0%, 0.6)",
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
  header: {
    fontSize: 30,
    color: "white",
    marginBottom: 50,
    zIndex: 1,
    textAlign: "center",
    marginTop: 10,
  },
  headerMenu: {
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    alignItems: "center",
    backgroundColor: "white",
    paddingLeft: 20,
    zIndex: 1,
  },
  takePicture: {
    margin: 10,
    backgroundColor: "hsla(87, 0%, 0%, 0.6)",
    padding: 15,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#DCFFB2",
  },
  buttonText: {
    color: "#DCFFB2",
    zIndex: 1,
    letterSpacing: 2,
    textAlign: "center",
    fontSize: 20,
  },
  plantHeader: {
    fontSize: 20,
    zIndex: 1,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "hsla(87, 0%, 0%, 0.6)",
    padding: 20,
    textAlign: "center",
  },
  plantImage: {
    width: 200,
    height: 200,
    zIndex: 1,
    alignSelf: "center",
  },
})

export default PlantIdentify
