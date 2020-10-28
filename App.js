import * as React from 'react';
import { createContext, useContext } from 'react';
import { StyleSheet, Text, View , Button} from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import PlantIdentify from './Components/IdentifyComponents/PlantIdentify'

import Plants from './Stores/Plants'
import MyGarden from './Components/GardenComponents/MyGarden.jsx'
import Home from './Components/GeneralComponents/Home.jsx'

const PlantsContext = createContext({})
export const PlantsProvider = PlantsContext.Provider
export const usePlantsStore = () => useContext(PlantsContext)
const plants = new Plants()
const store = {plants}

const Drawer = createDrawerNavigator();

export default function App() {
//   <View style={styles.container}>
//   <Text>Open up App.js to start working on your app!</Text>
//   <Home/>
//       <MyGarden />
// </View>

  return (

    <>
      <NavigationContainer>
        <PlantsProvider value= {store}>
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="PlantIdentify" component={PlantIdentify} />
            <Drawer.Screen name="MyGarden" component={MyGarden} />
            <Drawer.Screen name="Home" component={Home} />
          </Drawer.Navigator>
        </PlantsProvider>
      </NavigationContainer>
    </>

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
