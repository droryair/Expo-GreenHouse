import React from 'react';
import { Button, Text, View } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import plantIcon from '../../assets/plant.png'


// this component will be responsible to determine a plant format
// and rendering each plant from a given array


export default function RenderPlant(props) {
    console.log("render plants")
    const plants = props.route.params.plants
    const navigation = props.navigation
    const area = props.route.params.area
    console.log(area);
    const handlePress = (plant) => {
        return (
            navigation.navigate('PlantDetails', { plant })
        )
    }
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
            <Button title="Menu" onPress={() => navigation.toggleDrawer()} />
        <Text>These are the plants in your -{area.nickName? area.nickName : area.type}- garden area</Text>
        {/* <Text>PLANT!</Text> */}
             <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: 'row'
                }}>
            {plants.map((p, i) => {
                return (
                        <Card key={i}>
                            <Card.Title>id: {p}</Card.Title>
                            <Card.Divider />
                            <img height="100" src={p.imgURL? p.imgURL : plantIcon} />

                            <Text style={{ marginBottom: 10 }}>
                            </Text>
                            {/* {area.plants.map((p,i)=> <RenderPlant key={i} plant={p}/>)} */}
                            <Button
                                icon={<Icon name='code' color='green' />}
                                buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                                title='View Plant >'
                                onPress={() => handlePress(p)}
                            >
                            </Button>
                        </Card>
                )
            })}
            </View>
        </View>
    )
}