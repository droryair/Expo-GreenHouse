import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Button, Text, View, TouchableOpacity } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import RenderPlant from '../GardenComponents/RenderPlant'
import { createContext, useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { usePlantsStore } from '../../App';
import balcony from '../../assets/balcony.png'

// this component will be responsible to determine a garden format
// and rendering it.




export default function GardenArea(props) {

    const navigation = props.navigation
    const area = props.area
    const plants = area.plants
    
    const handlePress = () => {
        return (
            navigation.navigate('RenderPlant', { plants,area })
        )
    }
    
    return (
        <View>
            <Card>
                <Card.Title>{area.nickName? area.nickName:area.type}</Card.Title>
                <Card.Divider />
                <img height="300" src={area.imgURL? area.imgURL : balcony }/>
                <Text style={{ marginBottom: 10 }}>
                    <ul>
                        {area.conditions.map((c, i) => <li key={i}>{c}</li>)}
                    </ul>
                </Text>
                {/* {area.plants.map((p,i)=> <RenderPlant key={i} plant={p}/>)} */}
                <Button
                    icon={<Icon name='code' color='green' />}
                    buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                    title='View Garden >'
                    onPress={() =>handlePress()}
                >
                </Button>
            </Card>
        </View>
    )
}
{/* <RenderPlant plants={area.plants}/> */ }