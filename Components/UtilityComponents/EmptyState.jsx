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
        {/*          <Button
            title="< Go Back"
            color="black"
            onPress={() => {
              store.utilityStore.emptyStateGoBack()
            }}
          /> */}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  empty: {
    borderRadius: 30,
    textAlign: "center",
    padding: 10,
    backgroundColor: "hsla(87, 64%, 71%, 0.64)",
    alignSelf: "center",
    marginLeft: 20,
    marginRight: 20,
  },
  text: {
    textAlign: "center",
    fontSize: 20,
  },
  icon: {
    textAlign: "center",
  },
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
  },
})
