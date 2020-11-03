import React from "react"
import { Text, View, Image, StyleSheet, Modal } from "react-native"
import loadingGif from "../../assets/loader.gif"
import { useUtilityStore } from "../../App"

export default function LoadingState() {
  const store = useUtilityStore()
  return (
    <View style={styles.view}>
      <Text style={styles.text}>{store.utilityStore.loadingState.title}</Text>
      <Image
        style={styles.image}
        source={{
          uri: loadingGif,
        }}
      />
      <Text style={styles.text}>{store.utilityStore.loadingState.msg}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    height: 250,
    width: 250,
    borderRadius: 50,
  },
  text: { marginTop: 10, marginBottom: 10 },
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6e963f",
  },
})
