import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import PlantIdentify from './Components/PlantIdentify'  

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="PlantIdentify">
        <Drawer.Screen name="PlantIdentify" component={PlantIdentify} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}