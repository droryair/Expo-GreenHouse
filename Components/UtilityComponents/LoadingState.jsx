import React from "react"
import { Text, View, Image, StyleSheet, Modal } from "react-native"
import loadingGif from "../../assets/loader.gif"

export default function LoadingState() {
  return (
    <View style={styles.view}>
      <Image
        style={styles.image}
        source={{
          uri: loadingGif,
        }}
      />
      <Text style={styles.text}>Loading...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    height: 250,
    width: 250,
    borderRadius: 50,
  },
  text: { marginTop: 10, marginBottom: 10, fontSize: "Large" },
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#b1ca75",
  },
})
