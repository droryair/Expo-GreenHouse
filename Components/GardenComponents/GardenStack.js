import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import RenderPlant from './RenderPlant';
import PlantDetails from './PlantDetails';
import MyGarden from './MyGarden';
// import PushNotifications from '../PushNotifications/PushNotifications'
import ScheduleNotifications from '../PushNotifications/ScheduleNotifications';
const Stack = createStackNavigator();

export default function GardenStack() {
    return (
      <Stack.Navigator initialRouteName="MyGarden">
        <Stack.Screen name="MyGarden" component={MyGarden}/>
        <Stack.Screen name="RenderPlant" component={RenderPlant}/>
        <Stack.Screen name="PlantDetails" component={PlantDetails}/>
        <Stack.Screen name="ScheduleNotifications" component={ScheduleNotifications}/>
      </Stack.Navigator>
    );
  }