import React from "react"
import { Image } from "react-native"

export default function Logo(props) {
  return (
    <Image
      source={props.asset || require("../../assets/GeenHouse-logo.png")}
      style={{
        zIndex: 100,
        height: 80,
        width: 350,
        ...props.styling,
      }}
    />
  )
}
