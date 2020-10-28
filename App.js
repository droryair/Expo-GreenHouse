import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ImageList from './src/container/ImageList';
import { Provider } from 'mobx-react';
import Plants from './Stores/Plants'
import Home from './Components/Home'

// additional needed components:
// Plant- render each plant to "MyGarden" component
// navbar - menue component




export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />


      <Provider store={store}>
        <Plants />
      </Provider>
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


