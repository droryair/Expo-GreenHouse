import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Button, Text, View } from 'react-native';
import MyGarden from '../GardenComponents/MyGarden'
import PlantIdentify from '../IdentifyComponents/PlantIdentify'
import { createStackNavigator } from '@react-navigation/stack';
import { get } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePlantsStore } from '../../App';




//component assumptions:
// there are components named : "MyGarden" ,"IdentifyPlants","Recommended"




// const onPressGetStarted = () => {
//     // <Setup />
// }
// const onPressIdentifyPlants = () => {
//     // <IdentifyPlants/>
// }
// const onPressRecommended = () => {
//     // <Recommended/>
// }



// const Stack = createStackNavigator();

export default function Home({ navigation }) {

    const store = usePlantsStore()


    const hendlePress = (componentName) => {
        return (navigation.navigate(componentName))
    }



    const handleGarden = () => {
        return (navigation.navigate('MyGarden', { navigate: navigation.navigate }))
    }
    const logout = async () => {
        await AsyncStorage.removeItem('auth-token')
        const allStorage = await AsyncStorage.getAllKeys()
        console.log(allStorage);
        store.user.isLoggedIn = false
    }



    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
            <Button title="Menu" onPress={() => navigation.toggleDrawer()} />
            {store.user.isLoggedIn
                ? <>
                    <Button
                        onPress={() => hendlePress('MyGarden')}
                        title="Tend Garden"
                        color="green"
                    />
                    <Button
                        onPress={() => hendlePress('PlantIdentify')}
                        title="Identify Plants"
                        color="green"
                    />
                    {/* <Button
                        onPress={logout}
                        title="Logout"
                        color="green"
                    /> */}

                </>
                : <>
                    <Button

                        title="Get Started"
                        color="#841584"
                        accessibilityLabel="Get Started"
                        onPress={() => hendlePress('Login')}
                    />
                    {/* <Button
                        onPress={logout}
                        title="Logout"
                        color="green"
                    /> */}
                </>
            }
        </View>
    )
}

                    // {/* <NavigationContainer> */}

                    // {/* <Text>This is a link:</Text>
                    // <Stack.Navigator>
                    //     <Stack.Screen name="MyGarden" component={MyGarden} />
                    // </Stack.Navigator> */}

                    // {/* </NavigationContainer> */}