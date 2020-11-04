import React from "react"
import { View } from "react-native"
import { Snackbar, DefaultTheme } from "react-native-paper"
import { StyleSheet } from "react-native"
import { useUtilityStore } from "../../App"
import { observer } from "mobx-react"

const SnackBar = observer(() => {
  const store = useUtilityStore()
  return (
    <View style={styles.container}>
      <Snackbar
        visible={store.utilityStore.snackBar.isShown}
        onDismiss={() => store.utilityStore.hideSnackBar()}
        action={{
          label: "OK",
          onPress: () => {
            store.utilityStore.hideSnackBar()
          },
        }}
        theme={{
          colors: {
            primary: "black",
            onSurface: "#6e963f",
            accent: "black",
          },
        }}
      >
        {store.utilityStore.snackBar.msg}
      </Snackbar>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    zIndex: 200,
    justifyContent: "space-between",
  },
})

export default SnackBar
