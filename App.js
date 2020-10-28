import * as React from 'react';
import { createContext, useContext } from 'react';

import { Button, View } from 'react-native';

import { StyleSheet, Text, View } from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import PlantIdentify from './Components/PlantIdentify'

import Plants from './Stores/Plants'
import MyGarden from './Components/MyGarden'
import Home from './Components/Home'

const PlantsContext = createContext({})
export const PlantsProvider = PlantsContext.Provider
export const usePlantsStore = () => useContext(PlantsContext)
const plants = new Plants()
const store = plants 

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <Home/>
      <PlantsProvider value= {store}>
          <MyGarden />
      </PlantsProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="PlantIdentify">
          <Drawer.Screen name="PlantIdentify" component={PlantIdentify} />
        </Drawer.Navigator>
      </NavigationContainer>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
