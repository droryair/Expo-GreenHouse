import React, { useState, useEffect } from "react"
import { View } from "react-native"
import { Snackbar } from "react-native-paper"
import { StyleSheet } from "react-native"
import { useUtilityStore } from "../../App"

export default function SnackBar(props) {
  const store = useUtilityStore()
  return (
    <Snackbar
      visible={store.utilityStore.snackBar.isShown}
      onDismiss={store.utilityStore.hideSnackBar()}
      duration={store.utilityStore.snackBar.duration}
      style={styles.snackBar}
      action={{
        label: "OK",
        onPress: store.utilityStore.hideSnackBar(),
      }}
    >
      {store.utilityStore.snackBar}
    </Snackbar>
  )
}

// const styles = StyleSheet.create({
//   snackBar: {
//     backgroundColor: "black",
//     color: "black",
//     width: "50%",
//     height: "auto",
//     maxHeight: "50px",
//   },
// })
