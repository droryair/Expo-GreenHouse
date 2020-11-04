import React, { useState } from "react"
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
} from "react-native"
import { usePlantsStore } from "../../App"
import { observer } from "mobx-react"
import Home from "../GeneralComponents/Home"
import Logo from "../UtilityComponents/Logo"
import Backgroundvideo from "../UtilityComponents/BackgroundVideo"

// const PlantIdentify = observer(({ navigation }) => {
const Login = observer(({ navigation }) => {
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  const store = usePlantsStore()

  // console.log(navigation)

  const login = async () => {
    if (!email.length > 0) return alert("You must enter an Email Address")
    if (!password.length > 0) return alert("You must enter a Password")
    console.log(password)
    console.log(email)
    const user = {
      email: email,
      password: password,
    }
    await store.user.login(user)
    console.log(store.user)
    return store.user.isLoggedIn && navigation.replace("Home")
  }

  return (
    <View style={styles.container}>
      <Backgroundvideo asset={require("../../assets/background/plants-raindrops.mp4")} />
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Logo
          styling={{
            justifyContent: "center",
            width: 300,
            height: 70,
            marginBottom: 20,
          }}
          asset={require("../../assets/logo/GeenHouse-logo-white.png")}
        />

        <Text style={styles.text_header}>Login Now!</Text>
      </View>

      <ScrollView style={styles.form}>
        <Text style={styles.text_footer}>Email</Text>
        <View style={styles.action}>
          <TextInput
            placeholder="Your Email"
            placeholderTextColor="#DCFFB2"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => setEmail(val)}
          />
        </View>

        <Text
          style={[
            styles.text_footer,
            {
              marginTop: 35,
            },
          ]}
        >
          Password
        </Text>
        <View style={styles.action}>
          <TextInput
            placeholder="Your Password"
            placeholderTextColor="#DCFFB2"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => setPassword(val)}
          />
        </View>

        <View style={styles.button}>
          <TouchableOpacity style={styles.signIn} onPress={login}>
            <Text
              style={[
                styles.textSign,
                {
                  color: "#fff",
                  borderColor: "#fff",
                  borderWidth: 2,
                  padding: 10,
                  borderRadius: 10,
                  width: 100,
                  textAlign: "center",
                  backgroundColor: "hsla(87, 0%, 0%, 0.5)",
                },
              ]}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() =>
              navigation.navigate("Register", { navigate: navigation.navigate })
            }
          >
            <Text
              style={[
                styles.textSign,
                {
                  color: "#DCFFB2",
                  textAlign: "center",
                },
              ]}
            >
              Don't have an account yet? Register Now!
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
})

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    textAlign: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  form: {
    marginTop: 100,
  },
  footer: {
    flex: Platform.OS === "ios" ? 3 : 5,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#DCFFB2",
    fontSize: 20,
    alignSelf: "center",
  },
  text_footer: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "white",
    height: 50,
    backgroundColor: "hsla(87, 0%, 0%, 0.3)",
    borderRadius: 10,
    paddingLeft: 20,
    fontWeight: "bold",
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  color_textPrivate: {
    color: "grey",
  },
})
