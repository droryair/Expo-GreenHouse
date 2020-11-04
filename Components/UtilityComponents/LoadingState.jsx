import React from "react"
import { Text, View, Image, StyleSheet, Modal } from "react-native"
import loadingGif1 from "../../assets/loader1.gif"
import loadingGif2 from "../../assets/loader2.gif"
import loadingGif3 from "../../assets/loader3.gif"
import loadingGif4 from "../../assets/loader4.gif"
import { useUtilityStore } from "../../App"

export default function LoadingState() {
  const store = useUtilityStore()
  const getRandomLoader = () => {
    switch (store.utilityStore.loadingState.loader) {
      case 1:
        return loadingGif1
        break
      case 2:
        return loadingGif2
        break
      case 3:
        return loadingGif3
        break
      case 4:
        return loadingGif4
        break
      default:
        loadingGif1
        break
    }
  }
  return (
    <View style={styles.view}>
      <Text style={styles.text}>{store.utilityStore.loadingState.title}</Text>
      <Image
        style={styles.image}
        source={{
          uri: getRandomLoader(),
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
