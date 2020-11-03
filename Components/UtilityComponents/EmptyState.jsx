import React from "react"
import { Text, View } from "react-native"
import { Icon } from "react-native-elements"

export default function EmptyState() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Icon
        name="emoji-sad
"
        color="green"
      />
      <Text>Oops... There's no data to show here, please try again</Text>
    </View>
  )
}
