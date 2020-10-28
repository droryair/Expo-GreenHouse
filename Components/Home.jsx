import React from 'react';
import { Text, View } from 'react-native';


const onPressGetStarted =()=>{
    <Setup/>
}

const Home = () => {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
            <Text>Hello, world!</Text>

            <Button
                onPress={onPressGetStarted}
                title="Get Started"
                color="#841584"
                accessibilityLabel="Get Started"
            />
        </View>
    )
}



export default Home;