import React from 'react';
import { Button, Text, View } from 'react-native';
import { inject, observer, PropTypes } from "mobx-react";
import { PlantsProvider, usePlantsStore } from '../../App';
import { Card, ListItem, Icon } from 'react-native-elements'
import GardenArea from '../GardenComponents/GardenArea'
import { createStackNavigator } from '@react-navigation/stack';
import RenderPlant from './RenderPlant';
import { NavigationContainer } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

//COMPONENT RESPONSIBILITIES
// this component will be responsible for rendering garden management page,
// and calling the "GardenArea" component with all of the existing garden areas array


// import { Card, ListItem, Icon } from 'react-native-elements'

// component assumptions:
// there is a store named "plants"
//there is a component named "AddPlant"





export default function MyGarden({ navigation }){
    const onPressAddPlant = ()=>{
        // <AddPlant />
    }

    return (
        <View
        style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
            }}>
                <ScrollView>
            <Button title="Menu" onPress={() => navigation.toggleDrawer()} />
            <Text>My Garden</Text>

            <Button
                onPress={onPressAddPlant}
                title="+"
                color="#841584"
                accessibilityLabel="Add Plant"
            />
            {/* <View */}
                {/* style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: 'row'
                }}> */}
                {areas.map((a, i) => {
                    return (
                        <GardenArea key={i} area={a} navigation={navigation} />
                    )
                }
                )}
            {/* </View> */}
            </ScrollView>
        </View>
    )
}