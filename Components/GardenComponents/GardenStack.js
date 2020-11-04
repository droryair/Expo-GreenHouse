import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import RenderPlant from "./RenderPlant"
import PlantDetails from "./PlantDetails"
import MyGarden from "./MyGarden"
import NewPlant from "./NewPlant"
// import PushNotifications from '../PushNotifications/PushNotifications'
import ScheduleNotifications from "../PushNotifications/ScheduleNotifications"
const Stack = createStackNavigator()

export default function GardenStack() {
  return (
    <Stack.Navigator initialRouteName="MyGarden">
      <Stack.Screen name="MyGarden"     component={MyGarden}       options={{ title: 'My Garden' }}/>
      <Stack.Screen name="RenderPlant"  component={RenderPlant}   options={{ title: 'Plants In Garden' }} />
      <Stack.Screen name="PlantDetails" component={PlantDetails}  options={{ title: 'Plant Details' }}/>
      <Stack.Screen name="NewPlant"     component={NewPlant}      options={{ title: 'Add Plant' }}/>
      <Stack.Screen
        name="ScheduleNotifications"
        component={ScheduleNotifications}
      />
    </Stack.Navigator>
  )
}
