import React from "react"
import { Text, View, StyleSheet, Button } from "react-native"
import { Entypo } from "@expo/vector-icons"
import { useUtilityStore } from "../../App"

export default function EmptyState() {
  const store = useUtilityStore()
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        title="< Go Back"
        onPress={store.utilityStore.emptyState.handleGoBack}
      />
      <Text style={styles.empty}>
        <Entypo name="emoji-sad" size={24} color="black" style={styles.icon} />
        <Text style={styles.text}>{store.utilityStore.emptyState.msg}</Text>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  empty: {
    height: 250,
    width: 250,
    borderRadius: "50px",
    boxShadow: "1px 1px 5px 2px black",
    display: "grid",
    justifyContent: "center",
    alignContent: "center",
    padding: "10px",
  },
  text: {
    textAlign: "center",
  },
  icon: {
    textAlign: "center",
  },
})
