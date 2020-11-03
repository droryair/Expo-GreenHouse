import React, { useState, useEffect } from "react"
import { View } from "react-native"
import { Snackbar } from "react-native-paper"
import { StyleSheet } from "react-native"
export default function SnackBar(props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(props.visible)
  }, [props])

  const hideSnackBar = () => {
    setVisible(false)
  }
  return (
    <Snackbar
      visible={visible}
      onDismiss={hideSnackBar}
      duration={3000}
      style={styles.snackBar}
      action={{
        label: "OK",
        onPress: hideSnackBar,
      }}
    >
      {props.snackBarMsg}
    </Snackbar>
  )
}

const styles = StyleSheet.create({
  snackBar: {
    backgroundColor: "black",
    color: "black",
    width: "50%",
    height: "auto",
    maxHeight: "50px",
  },
})
