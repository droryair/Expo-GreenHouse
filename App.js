import * as React from 'react';

import { createContext } from 'react';
import { StyleSheet} from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import IdentifyStack from './Components/IdentifyComponents/IdentifyStack'

import Plants from './Stores/Plants'
import MyGarden from './Components/GardenComponents/MyGarden'
import Home from './Components/GeneralComponents/Home'
import Identification from './Stores/Identification';

export const PlantsContext = createContext({})
export const PlantsProvider = PlantsContext.Provider

const plants = new Plants()
const identification = new Identification()
const store = {plants , identification}

const Drawer = createDrawerNavigator();

export default function App() {
  return (

    <>
      <PlantsProvider  value={store}>
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
              <Drawer.Screen name="MyGarden" component={MyGarden} />
              <Drawer.Screen name="Home" component={Home} />
              <Drawer.Screen name="IdentifyStack" component={IdentifyStack} />
            </Drawer.Navigator>
        </NavigationContainer>
      </PlantsProvider>
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
