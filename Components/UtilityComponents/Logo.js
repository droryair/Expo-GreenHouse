import React from "react"
import { Image } from "react-native"

export default function Logo(props) {
  return (
    <Image
      source={props.asset}
      style={{
        zIndex: 100,
        height: 80,
        width: 350,
        marginBottom: props.marginBottom,
      }}
    />
  )
}
