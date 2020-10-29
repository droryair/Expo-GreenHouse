import React from 'react';
import { Button, Text, View } from 'react-native';
import { inject, observer, PropTypes } from "mobx-react";
import { usePlantsStore } from '../../App';
import { Card, ListItem, Icon } from 'react-native-elements'
import GardenArea from '../GardenComponents/GardenArea'
import { createStackNavigator } from '@react-navigation/stack';
import RenderPlant from './RenderPlant';

//COMPONENT RESPONSIBILITIES
// this component will be responsible for rendering garden management page,
// and calling the "GardenArea" component with all of the existing garden areas array



// component assumptions:
// there is a store named "plants"
//there is a component named "AddPlant"

const Stack = createStackNavigator();

export default function MyGarden({ navigation: { navigate } }) {
    const store = usePlantsStore()
    const areas = store.gardenAreas.areas
    // const navigation = props.navigation

    const onPressAddArea = () => {
        // <NewArea />
    }

    const handlePress = (area) => {
        return (
            navigate('RenderPlant',{plants:area.plants})
            // <>
            //     {console.log("pressed")}
            //     {area.plants.map((p, i) => {
            //         return (
            //             <View key={i}
            //                 style={{
            //                     flex: 1,
            //                     justifyContent: "center",
            //                     alignItems: "center"
            //                 }}>
            //                 {/* {plants.map((p,i)=><Text key={i}>{p}</Text>)} */}
            //                 <Text>PLANT! {p}</Text>
            //             </View>
            //         )
            //     })}
            // </>
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
            <Text>My Garden</Text>

            <Button
                onPress={onPressAddArea}
                title="+ | New Garden Area"
                color="green"
            />
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: 'row'
                }}>
                {areas.map((a, i) => {
                    // return (
                    //     <GardenArea key={i} area={a} navigation = {navigation}/>
                    // )
                    return (
                        <Card key={i}>
                            <Card.Title>{a.nickName}</Card.Title>
                            <Card.Divider />
                            <img height="300" src={a.imgURL} />
                            <Text style={{ marginBottom: 10 }}>
                                <ul>
                                    {a.conditions.map((c, i) => <li key={i}>{c}</li>)}
                                </ul>
                            </Text>
                            {/* {area.plants.map((p,i)=> <RenderPlant key={i} plant={p}/>)} */}
                            <Button
                                icon={<Icon name='code' color='green' />}
                                buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                                title='View Garden >'
                                onPress={() => handlePress(a)}
                            >
                                <Text>HI</Text>
                            </Button>
                        </Card>
                    )
                }
                )}
            </View>

        </View>
    )
}