import React from 'react';
import { Button, Text, View } from 'react-native';
import { inject, observer, PropTypes } from "mobx-react";
import { usePlantsStore } from '../../App';

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
        <Button title="Menu" onPress={() => navigation.toggleDrawer()} />
            <Text>My Garden</Text>

            <Button
                onPress={onPressAddPlant}
                title="+"
                color="#841584"
                accessibilityLabel="Add Plant"
            />
            {/* Call a different component to render each plant */}
            {/* {props.plants.map(p=>{
                return( */}
                {/* ) */}
            {/* })} */}

            {/* <Card>
                <Card.Title>PLANT CARD</Card.Title>
                <Card.Divider />
                <Card.Image source="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ2IvVme1cm_BbG8uoXgr1cqy3ZQqSI1MFxdA&usqp=CAU" />
                <Text style={{ marginBottom: 10 }}>
                    Here will be the info about the plant
                </Text>
                <Button
                    icon={<Icon name='code' color='green' />}
                    buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                    title='View Plant >' 
                />
            </Card> */}
        </View>
    )
}