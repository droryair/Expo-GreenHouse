import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Button, Text, View, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import RenderPlant from '../GardenComponents/RenderPlant'
import { createContext, useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { usePlantsStore } from '../../App';
import balcony from '../../assets/balcony.png'
import { FlatList } from 'react-native-gesture-handler';

// this component will be responsible to determine a garden format
// and rendering it.




export default function GardenArea(props) {

    const navigation = props.navigation
    const area = props.area
    const plants = area.plants

    const handlePress = () => {
        return (
            navigation.navigate('RenderPlant', { plants, area })
        )
    }

    return (
        <View>
        <ScrollView>
            <Card>
                <Text>
                    <Card.Title>{area.nickName ? area.nickName : area.type}</Card.Title>
                </Text>
                <Card.Divider />
                <Image
                style={styles.tinyLogo}
                    source={area.imgURL ? area.imgURL : balcony}
                />
                <Text style={{ marginBottom: 10 }}>
                    {/* <ul>
                        {area.conditions.map((c, i) => <li key={i}>{c}</li>)}
                    </ul> */}
                    {area.conditions.map((c, i) => {
                        return (
                            <FlatList
                                key={i}
                                data={[
                                    { key: `${c}` }
                                ]}
                                renderItem={({ item }) => <Text style={styles.item}>{item.key}</Text>}
                            />
                        )
                    })}

                </Text>
                <Text>
                    <Button
                        icon={<Icon name='code' color='green' />}
                        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                        title='View Garden >'
                        onPress={() => handlePress()}
                    />
                </Text>
            </Card>
        </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    tinyLogo: {
        width: 50,
        height: 50,
      },
});

// {/* <RenderPlant plants={area.plants}/> */ }
// {/* {area.plants.map((p,i)=> <RenderPlant key={i} plant={p}/>)} */}
// {/* <Image height="300" source={area.imgURL? area.imgURL : balcony }/> */}