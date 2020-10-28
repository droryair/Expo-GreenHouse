import React from 'react';
import { Button, Text, View } from 'react-native';
import MyGarden from './MyGarden'
//component assumptions:
// there are components named : "MyGarden" ,"IdentifyPlants","Recommended"

const isLoggedIn = true;

const onPressGetStarted = () => {
    // <Setup />
}
const onPressMyGarden =()=>{
    <MyGarden/>
}
const onPressIdentifyPlants =()=>{
    // <IdentifyPlants/>
}
const onPressRecommended =()=>{
    // <Recommended/>
}



export default function Home({ navigation }) {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
            <Text>Hello, world!</Text>
            {isLoggedIn
                ? <>
                      <Button
                        onPress={onPressMyGarden}
                        title="Tend Garden"
                        color="#841584"
                        accessibilityLabel="Tend Garden"
                    />
                      <Button
                        onPress={onPressIdentifyPlants}
                        title="Identify Plants"
                        color="#841584"
                        accessibilityLabel="Identify Plants"
                    />
                      <Button
                        onPress={onPressRecommended}
                        title="Recommended For You"
                        color="#841584"
                        accessibilityLabel="Recommended For You"
                    />
                    <Button title="Toggle drawer" onPress={() => navigation.toggleDrawer()} />
                    {/* Tend Garden, Identify Plants, Recommended for you  */}
                </>
                : <>
                    <Button
                        onPress={onPressGetStarted}
                        title="Get Started"
                        color="#841584"
                        accessibilityLabel="Get Started"
                    />
                </>
            }
        </View>
    )
}