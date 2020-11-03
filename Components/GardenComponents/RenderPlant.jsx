import { observer } from "mobx-react"
import React, { useEffect } from "react"
import { Button, Text, View, Image, ScrollView, StyleSheet } from "react-native"
import { Card, Icon } from "react-native-elements"
import { usePlantsStore } from "../../App"
import plantIcon from "../../assets/plant.png"

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

  const handlePress = (plantID) => {
    return navigation.navigate("PlantDetails", { plantID })
  }
  const handleNewPlantPress = () => {
    return navigation.navigate("NewPlant", area)
  }
  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button title="Menu" onPress={() => navigation.toggleDrawer()} />
        <Button
          icon={<Icon name="code" color="green" />}
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
          }}
          title="New Plant"
          onPress={() => handleNewPlantPress()}
        />
        <Text>
          These are the plants in your -
          {area.nickName ? area.nickName : area.type}- garden area
        </Text>
        <View>
          {currentGardenPlants.map((p, i) => {
            return (
              <Card key={i}>
                <Text>
                  <Card.Title>{p.nickname}</Card.Title>
                </Text>
                <Card.Divider />
                <Image
                  style={styles.tinyLogo}
                  source={p.img_link ? p.img_link : plantIcon}
                />
                <Text style={{ marginBottom: 10 }}></Text>
                <Button
                  icon={<Icon name="code" color="green" />}
                  buttonStyle={{
                    borderRadius: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    marginBottom: 0,
                  }}
                  title="View Plant >"
                  onPress={() => handlePress(p.id)}
                />
              </Card>
            )
          })}
        </View>
      </View>
    </ScrollView>
  )
})
const styles = StyleSheet.create({
  tinyLogo: {
    width: 50,
    height: 50,
  },
})

export default RenderPlant
