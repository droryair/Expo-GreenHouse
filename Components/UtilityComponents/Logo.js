import React from "react"
import { View, StyleSheet, Image } from "react-native"

export default function Logo(props) {
  return <Image source={props.asset} style={styles.logo} />
}
const styles = StyleSheet.create({
  logo: {
    zIndex: 100,
    height: 80,
    width: 350,
    marginBottom: 50,
  },
})
