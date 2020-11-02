import * as Notifications from 'expo-notifications';
import React, { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as Permissions from 'expo-permissions';
import PushNotifications from './PushNotifications';




export default function FutureNotification() {

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
    const trigger = new Date(Date.now()); //60 * 60 *
    // trigger.setHours(25*2)
    trigger.setMinutes(0);
    trigger.setSeconds(3);
    
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Happy new hour!',
      },
      trigger,
    });
    
  }

  return (
    <View style={styles.container}>
      <Text>React Native Push Notification</Text>
      <Button onPress={()=>notify()} title="Future notification"/>
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





