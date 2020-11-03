import React, { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as Notifications  from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import ScheduleNotifications from './ScheduleNotifications';



export default function PushNotifications() {

  const getPushNotificationPermissions = async () => {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }
    console.log(finalStatus)

    // Get the token that uniquely identifies this device
    console.log("Notification Token: ", await Notifications.getExpoPushTokenAsync());
  }


  

  useEffect(() => {
    getPushNotificationPermissions();
  });


  const notify=()=>{
    Notifications.presentNotificationAsync({
      title: 'Look at that notification',
      body: "I'm so proud of myself!",
    });
  }

  return (
    <View style={styles.container}>
      <Text>React Native Push Notification</Text>
      <Button onPress={()=>notify()} title="instant notification"/>      
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



//ExponentPushToken[rJNPDANbPXhLeDGrroAJHw]