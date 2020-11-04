import React from "react"
import { StyleSheet, View } from "react-native"
import { Video, Image } from "expo-av"

export default function Backgroundvideo(props) {
  return (
    <View style={styles.overlay}>
      <Video
        source={props.asset}
        rate={1.0}
        volume={1.0}
        isMuted={true}
        resizeMode="cover"
        shouldPlay
        isLooping
        style={styles.video}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 0,
  },
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "#000",
    opacity: 0.8,
  },
})
