import React from "react"
import { Text, View, Image, StyleSheet } from "react-native"
import loadingGif from "../../assets/loader.gif"

export default function LoadingState() {
  return (
    <div
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        style={styles.image}
        source={{
          uri: loadingGif,
        }}
      />
      <Text style={styles.text}>Loading...</Text>
    </div>
  )
}

const styles = StyleSheet.create({
  image: {
    height: 250,
    width: 250,
    borderRadius: "50px",
    boxShadow: "1px 1px 5px 2px black",
  },
  text: { marginTop: "10px", marginBottom: "10px" },
})
