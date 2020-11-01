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

const plants = new Plants()
const identification = new Identification()
const stores = {plants , identification}

export const PlantsContext = createContext(stores)
export const PlantsProvider = PlantsContext.Provider


const Drawer = createDrawerNavigator();

export default function App() {
  return (

    <>
      <PlantsProvider  value={stores}>
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
