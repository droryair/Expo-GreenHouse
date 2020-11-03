import * as React from 'react';

import { createContext, useContext } from 'react';

import { StyleSheet, Text, View, Button } from 'react-native';




import { createDrawerNavigator, DrawerItem, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import IdentifyStack from './Components/IdentifyComponents/IdentifyStack'

import Plants from './Stores/Plants'
import MyGarden from './Components/GardenComponents/MyGarden'
import Home from './Components/GeneralComponents/Home'
import Identification from './Stores/Identification';
import gardenAreasStore from './Stores/gardenAreasStore';

import User from './Stores/userStore';
import Register from './Components/UserComponents/Register';
import Login from './Components/UserComponents/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';


import RenderPlant from './Components/GardenComponents/RenderPlant';
import PlantDetails from './Components/GardenComponents/PlantDetails';
import GardenStack from './Components/GardenComponents/GardenStack';
import PushNotifications from './Components/PushNotifications/PushNotifications'
import NotificationsStack from './Components/PushNotifications/NotificationsStack'
import BOTanistChat from './Components/BOTanistComponents/BOTanistChat'
import GetStarted from './Components/GeneralComponents/GetStarted';
import AuthStack from './Components/UserComponents/AuthStack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Logout from './Components/UserComponents/Logout';




const identification = new Identification()
const gardenAreas = new gardenAreasStore()

const user = new User


const PlantsStore = new Plants()

const store = { PlantsStore, identification, gardenAreas, user }

export const PlantsContext = createContext(store)
export const PlantsProvider = PlantsContext.Provider
export const usePlantsStore = () => useContext(PlantsContext)



const Drawer = createDrawerNavigator();

console.log(store.user);



export default function App() {


  const logout = async () => {
    await AsyncStorage.removeItem('auth-token')
    const allStorage = await AsyncStorage.getAllKeys()
    console.log(allStorage);
    store.user.isLoggedIn = false
  }

  return (
    <>

      <NavigationContainer>
        <PlantsProvider value={store}>


          <>
            <Drawer.Navigator initialRouteName="Home">
              {/* <Drawer.Screen name="MyGarden" component={MyGarden} /> */}
              {/* <Drawer.Screen name="Home" component={Home} /> */}
              <Drawer.Screen name="Home" component={AuthStack} />
              <Drawer.Screen name="Identify Plant" component={IdentifyStack} />
              <Drawer.Screen name="My Garden" component={GardenStack} />
              {/* <Drawer.Screen name="NotificationsStack" component={NotificationsStack} /> */}
              <Drawer.Screen name="BOTanist" component={BOTanistChat} />
              <Drawer.Screen name="Logout" component={Logout} />

              {/* <Drawer.Screen name="Login" component={Login} /> */}

              {/* <Drawer.Screen name="RenderPlant" component={RenderPlant}/>
            <Drawer.Screen name="PlantDetails" component={PlantDetails}/> */}
            </Drawer.Navigator>

            {/* <DrawerContentScrollView >              
              <DrawerItem label="Logout" onPress={() => logout()} />
            </DrawerContentScrollView> */}
          </>
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
