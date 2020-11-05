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

  const handlePress = (plantID, plant) => {
    console.table(currentGardenPlants);
    return navigation.navigate("PlantDetails", { plantID, plant })
  }
  const handleNewPlantPress = () => {
    return navigation.navigate("NewPlant", area)
  }
  return (
    <ScrollView style={styles.scroll}>
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
              <Card style={styles.card} key={i}>
                <Text>
                  <Card.Title>{p.nickname}</Card.Title>
                </Text>
                <Card.Divider />
                  {p.img_link 
                    ? <Image
                        style={styles.tinyLogo}
                        source={{uri:p.img_link}}
                      />
                    : null
                  }

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
                  onPress={() => handlePress(p.id, p )}
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
    width: "100%",
    height: 200,
  },
  card:{
    flex:1,
    // width: "90%",
    // marginLeft: "5%"
  },
  scroll:{
    width:"100%"
  }
})

export default RenderPlant
