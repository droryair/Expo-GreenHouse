import * as React from 'react';

import { createContext, useContext } from 'react';

import { StyleSheet, Text, View, Button } from 'react-native';




import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import IdentifyStack from './Components/IdentifyComponents/IdentifyStack'

import Plants from './Stores/Plants'
import MyGarden from './Components/GardenComponents/MyGarden'
import Home from './Components/GeneralComponents/Home'
import Identification from './Stores/Identification';
import gardenAreasStore from './Stores/gardenAreasStore';

import User from './Stores/userStore';
import Register from './Components/UserComponents/diffRegister';
import Login from './Components/UserComponents/diffLogin';
import AsyncStorage from '@react-native-async-storage/async-storage';


import RenderPlant from './Components/GardenComponents/RenderPlant';
import PlantDetails from './Components/GardenComponents/PlantDetails';
import GardenStack from './Components/GardenComponents/GardenStack';
import PushNotifications from './Components/PushNotifications/PushNotifications'
import NotificationsStack from './Components/PushNotifications/NotificationsStack'
import BOTanistChat from './Components/BOTanistComponents/BOTanistChat'
<<<<<<< HEAD
import DiseasesStore from './Stores/DiseasesStore';
=======
>>>>>>> 0edb61dbfa98e8ea8663f2e8f1225ffe85956703




const identification = new Identification()
const gardenAreas = new gardenAreasStore()
<<<<<<< HEAD
=======

const user = new User


>>>>>>> 0edb61dbfa98e8ea8663f2e8f1225ffe85956703
const PlantsStore = new Plants()
const Diseases = new DiseasesStore()

<<<<<<< HEAD
const store = {PlantsStore , identification, gardenAreas,Diseases}
=======
const store = { PlantsStore, identification, gardenAreas, user }
>>>>>>> 0edb61dbfa98e8ea8663f2e8f1225ffe85956703

export const PlantsContext = createContext(store)
export const PlantsProvider = PlantsContext.Provider
export const usePlantsStore = () => useContext(PlantsContext)



const Drawer = createDrawerNavigator();

console.log(store.user);



export default function App() {


  React.useEffect(() => {
    const checkedLoggedIn = async () => {
      const token = await AsyncStorage.getItem('auth-token')
      console.log(token);
      if (token !== null) {
        await fetch('http://192.168.1.11:3001', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-auth-token': token
          }
        })
          .then(response => response.json())
          .then(async responseJson => {
            console.log(responseJson);
            let user = {
              city: responseJson.city,
              createdAt: responseJson.createdAt,
              email: responseJson.email,
              firstName: responseJson.firstName,
              id: responseJson.id,
              lastName: responseJson.lastName,
              rankID: responseJson.rankID,
              xp: responseJson.xp
            }
            store.user.getUserDetails(user, token)

          })
          .catch(err => {
            console.log(err)
            alert(err)
          })
      }
    }
    checkedLoggedIn()
  }, [])
  return (
    <>
      <NavigationContainer>
        <PlantsProvider value={store}>
<<<<<<< HEAD
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
=======

          {!store.user.isLoggedIn ?
            <>
              <Login />
              {/* <Register />  */}
            </>
            :
            <>

              <Drawer.Navigator initialRouteName="Home">
                {/* <Drawer.Screen name="MyGarden" component={MyGarden} /> */}
                <Drawer.Screen name="Home" component={Home} />
                <Drawer.Screen name="IdentifyStack" component={IdentifyStack} />
                <Drawer.Screen name="GardenStack" component={GardenStack} />
                <Drawer.Screen name="NotificationsStack" component={NotificationsStack} />
                <Drawer.Screen name="BOTanistChat" component={BOTanistChat} />

                {/* <Drawer.Screen name="RenderPlant" component={RenderPlant}/>
            <Drawer.Screen name="PlantDetails" component={PlantDetails}/> */}
              </Drawer.Navigator>
            </>
          }
>>>>>>> 0edb61dbfa98e8ea8663f2e8f1225ffe85956703
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
