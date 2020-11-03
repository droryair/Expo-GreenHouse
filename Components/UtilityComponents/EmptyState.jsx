import React from "react"
import { Text, View, StyleSheet, Button } from "react-native"
import { Entypo } from "@expo/vector-icons"
import { useUtilityStore } from "../../App"

export default function EmptyState() {
  const store = useUtilityStore()
  return (
    <View style={styles.view}>
      <Text style={styles.empty}>
        <Entypo name="emoji-sad" size={24} color="black" style={styles.icon} />
        <Text style={styles.text}>{store.utilityStore.emptyState.msg}</Text>
        <Button
          title="< Go Back"
          onPress={() => {
            store.utilityStore.emptyStateGoBack()
          }}
        />
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  empty: {
    height: 250,
    width: 250,
    borderRadius: 50,
    display: "grid",
    gridGap: 10,
    justifyContent: "center",
    alignContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  text: {
    textAlign: "center",
  },
  icon: {
    textAlign: "center",
  },
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#b1ca75",
  },
})
