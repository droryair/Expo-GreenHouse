import React from "react"
import { StyleSheet } from "react-native"
import { Video } from "expo-av"

export default function Backgroundvideo(props) {
  return (
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
})
