import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Button, Text, View } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import RenderPlant from '../GardenComponents/RenderPlant'
import { createContext, useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { usePlantsStore } from '../../App';

// this component will be responsible to determine a garden format
// and rendering it.




export default function GardenArea(props) {

    const store = usePlantsStore()
    const areas = store.gardenAreas.areas
    const navigation = props.navigation

    // const {area}= props
    // const plants = area.plants
    // const store = plants



    const handlePress = () => {
        console.log("pressed")
        return (
            navigation.navigate('MyGarden', { screen: 'RenderPlant' })
            // navigation.navigate('RenderPlant')
            // areas[0].plants.map(p => <RenderPlant plant={p} />)
        )
    }

    
    return (
        <View>

            <Card>
                <Card.Title>{areas[0].nickName}</Card.Title>
                <Card.Divider />
                <img height="300" src={areas[0].imgURL}/>
                <Text style={{ marginBottom: 10 }}>
                    <ul>
                        {areas[0].conditions.map((c, i) => <li key={i}>{c}</li>)}
                    </ul>
                </Text>
                {/* {area.plants.map((p,i)=> <RenderPlant key={i} plant={p}/>)} */}
                <Button
                    icon={<Icon name='code' color='green' />}
                    buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                    title='View Garden >'
                    onPress={() =>handlePress()}
                />
            </Card>
        </View>
    )
}
{/* <RenderPlant plants={area.plants}/> */ }