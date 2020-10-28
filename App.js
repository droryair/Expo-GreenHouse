import { StatusBar } from 'expo-status-bar';
import React, { createContext, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'mobx-react';
import Plants from './Stores/Plants'
import MyGarden from './Components/MyGarden'
import Home from './Components/Home'

// additional needed components:
// Plant- render each plant to "MyGarden" component
// navbar - menue component
const PlantsContext = createContext({})
export const PlantsProvider = PlantsContext.Provider
export const usePlantsStore = () => useContext(PlantsContext)
const plants = new Plants()
const store = plants 


export default function App() {

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    <Home/>

    <PlantsProvider value= {store}>
        <MyGarden />
    </PlantsProvider>
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





