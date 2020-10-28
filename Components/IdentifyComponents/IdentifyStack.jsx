import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import PlantIdentify from './PlantIdentify'
import Camera from './Camera'
const Stack = createStackNavigator();

export default function IdentifyStack() {
    return (
      <Stack.Navigator initialRouteName="PlantIdentify">
        <Stack.Screen name="PlantIdentify" component={PlantIdentify}/>
        <Stack.Screen name="Camera" component={Camera} />
      </Stack.Navigator>
    );
  }