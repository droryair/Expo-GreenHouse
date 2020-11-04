import React from "react"
import { Text, View, Image, StyleSheet } from "react-native"
import { useUtilityStore } from "../../App"

export default function LoadingState() {
  const store = useUtilityStore()

  const getRandomLoader = () => {
    switch (store.utilityStore.loadingState.loader) {
      case 1:
        return require("../../assets/loader1.gif")
      case 2:
        return require("../../assets/loader2.gif")
      case 3:
        return require("../../assets/loader3.gif")
      case 4:
        return require("../../assets/loader4.gif")
      default:
        return require("../../assets/loader1.gif")
    }
  }
  return (
    <View style={styles.view}>
      <Text style={styles.text}>{store.utilityStore.loadingState.title}</Text>
      <Image style={styles.image} source={getRandomLoader()} />
      <Text style={styles.msg}>{store.utilityStore.loadingState.msg}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    height: 250,
    width: 250,
    borderRadius: 10,
    backgroundColor: "white",
  },
  text: { marginTop: 10, marginBottom: 10, fontSize: 20 ,fontWeight:"bold" },
  msg: { marginTop: 10, marginBottom: 10, fontSize: 20 },
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6e963f",
  },
})
