import * as React from 'react';

import { createContext, useContext } from 'react';
import { StyleSheet} from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import IdentifyStack from './Components/IdentifyComponents/IdentifyStack'

import Plants from './Stores/Plants'
import MyGarden from './Components/GardenComponents/MyGarden'
import Home from './Components/GeneralComponents/Home'
import Identification from './Stores/Identification';
import gardenAreasStore from './Stores/gardenAreasStore';
import RenderPlant from './Components/GardenComponents/RenderPlant';
import PlantDetails from './Components/GardenComponents/PlantDetails';
import GardenStack from './Components/GardenComponents/GardenStack';
import PushNotifications from './Components/PushNotifications/PushNotifications'
import NotificationsStack from './Components/PushNotifications/NotificationsStack'
import BOTanistChat from './Components/BOTanistComponents/BOTanistChat'
import BOTanistStore from './Stores/BOTanistStore';

// const plants = new Plants()
const identification = new Identification()
const gardenAreas = new gardenAreasStore()
const botanistStore = new BOTanistStore()
const PlantsStore = new Plants()

const store = {PlantsStore , identification, gardenAreas,botanistStore}

export const PlantsContext = createContext(store)
export const PlantsProvider = PlantsContext.Provider
export const usePlantsStore = () => useContext(PlantsContext)


const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <PlantsProvider value={store}>
          <Drawer.Navigator initialRouteName="Home">
            {/* <Drawer.Screen name="MyGarden" component={MyGarden} /> */}
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="IdentifyStack" component={IdentifyStack} />
            <Drawer.Screen name="GardenStack" component={GardenStack} />
            <Drawer.Screen name="NotificationsStack" component={NotificationsStack}/>
            <Drawer.Screen name="BOTanistChat" component={BOTanistChat}/>

            {/* <Drawer.Screen name="RenderPlant" component={RenderPlant}/>
            <Drawer.Screen name="PlantDetails" component={PlantDetails}/> */}
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
