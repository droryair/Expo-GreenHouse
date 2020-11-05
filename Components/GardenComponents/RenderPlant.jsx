import { observer } from "mobx-react"
import React, { useEffect } from "react"
import {
  Button,
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native"
import { Card, Icon } from "react-native-elements"
import { usePlantsStore } from "../../App"
import plantIcon from "../../assets/plant.png"
import Logo from "../UtilityComponents/Logo"
import LoadingState from "../UtilityComponents/LoadingState"
import EmptyState from "../UtilityComponents/EmptyState"

// this component will be responsible to determine a plant format
// and rendering each plant from a given array

const RenderPlant = observer((props) => {
  const store = usePlantsStore()
  const { currentGardenPlants } = store.gardenAreas
  const plants = props.route.params.plants
  const navigation = props.navigation
  const area = props.route.params.area

  useEffect(() => {
    store.gardenAreas.getGardensPlants(area.id)
  }, [])

  if (!currentGardenPlants.length) {
    store.utilityStore.showEmptyState(null, () => {
      navigation.navigate("MyGarden")
    })
  }
  const handlePress = (plantID) => {
    return navigation.navigate("PlantDetails", { plantID ,navigation})
  }
  const handleNewPlantPress = () => {
    return navigation.navigate("NewPlant", { area })
  }
  return store.utilityStore.loadingState.isShown ? (
    <LoadingState />
  ) : (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <ImageBackground
          source={require("../../assets/background/background1.jpeg")}
          style={styles.image}
        />
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
        <View>
          <View style={styles.newPlantBtn}>
            <TouchableOpacity
              title="New Plant"
              onPress={() => handleNewPlantPress()}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#fff",
                    borderColor: "#fff",
                    borderWidth: 2,
                    padding: 10,
                    borderRadius: 10,
                    width: 300,
                    textAlign: "center",
                    backgroundColor: "hsla(87, 0%, 0%, 0.5)",
                    fontSize: 20,
                  },
                ]}
              >
                + New Plant
              </Text>
            </TouchableOpacity>
          </View>
          {/*  <Button
          icon={<Icon name="code" color="green" />}
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
          }}
          title="New Plant"
          onPress={() => handleNewPlantPress()}
        /> */}
          <Text style={styles.title}>
            These are the plants in your -
            {area.nickName ? area.nickName : area.type}- garden area
          </Text>
          <View>
            {store.utilityStore.emptyState.isShown &&
            !currentGardenPlants.length ? (
              <EmptyState />
            ) : (
              currentGardenPlants.map((p, i) => {
                return (
                  <Card style={styles.card} key={i}>
                    <Text>
                      <Card.Title>{p.nickname}</Card.Title>
                    </Text>
                    <Card.Divider />
                    {p.img_link ? (
                      <Image
                        style={styles.tinyLogo}
                        source={{ uri: p.img_link }}
                      />
                    ) : null}

                    <Text style={{ marginBottom: 10 }}></Text>
                    <Button
                      icon={<Icon name="code" color="green" />}
                      buttonStyle={{
                        borderRadius: 0,
                        marginLeft: 0,
                        marginRight: 0,
                        marginBottom: 0,
                      }}
                      color="#6e963f"
                      title="View Plant >"
                      onPress={() => handlePress(p.id)}
                    />
                  </Card>
                )
              })
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  )
})
const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    alignItems: "center",
    backgroundColor: "white",
    paddingLeft: 20,
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
  tinyLogo: {
    width: "100%",
    height: 200,
  },
  card: {
    flex: 1,
    // width: "90%",
    // marginLeft: "5%"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
    color: "white",
    marginTop: 20,
    marginBottom: 10,
    letterSpacing: 2,
  },
  newPlantBtn: { alignSelf: "center", marginTop: 20 },
})

export default RenderPlant
