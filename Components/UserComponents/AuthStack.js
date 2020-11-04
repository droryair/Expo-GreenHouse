import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import GetStarted from '../GeneralComponents/GetStarted';
import Register from './Register';
import Login from './Login';
import Home from '../GeneralComponents/Home';
import Logout from './Logout';
import GardenStack from '../GardenComponents/GardenStack';
import IdentifyStack from '../IdentifyComponents/IdentifyStack';

const Stack = createStackNavigator();

export default function AuthStack() {
    return (
        <Stack.Navigator initialRouteName="GetStarted">
            <Stack.Screen
                options={{
                    headerShown: false
                }}
                name="Login"
                component={Login} />
            <Stack.Screen name="GetStarted" component={GetStarted} />
            <Stack.Screen name="AuthStack" component={AuthStack} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Logout" component={Logout} />
            <Stack.Screen name="MyGarden" component={GardenStack} />
            <Stack.Screen name="PlantIdentify" component={IdentifyStack} />
        </Stack.Navigator>
    );
}