import React, { useState } from 'react';
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
    StatusBar
} from 'react-native';
import { usePlantsStore } from '../../App';
import { observer } from 'mobx-react'



// const PlantIdentify = observer(({ navigation }) => {
const Register = observer(({ navigation }) => {

    const [password, setPassword] = useState('')

    const store = usePlantsStore()
    console.log(password)


    const register = async () => {
        if (!store.user.firstName.length > 0) return alert("You must enter a Name")

        if (!store.user.email.length > 0) return alert("You must enter an Email Address")

        if (!password.length > 0) return alert("You must enter a Password")

        if (!store.user.city.length > 0) return alert("You must enter a City")
        console.log(password)
        const user = {
            full_name: store.user.firstName + ' ' + store.user.lastName,
            email: store.user.email,
            password: password,
            city_name: store.user.city
        }
        await store.user.registration(user)
    }


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Register Now!</Text>
            </View>

            <ScrollView>
                <Text style={styles.text_footer}>Full Name</Text>
                <View style={styles.action}>

                    <TextInput
                        placeholder="Your Full name"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => store.user.registerName(val)}
                    />

                </View>
                <Text style={styles.text_footer}>Email</Text>
                <View style={styles.action}>

                    <TextInput
                        placeholder="Your Email"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => store.user.registerEmail(val)} />

                </View>

                <Text style={[styles.text_footer, {
                    marginTop: 35
                }]}>Password</Text>
                <View style={styles.action}>

                    <TextInput
                        placeholder="Your Password"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => setPassword(val)}
                    />

                </View>

                <Text style={[styles.text_footer, {
                    marginTop: 35
                }]}>City</Text>
                <View style={styles.action}>

                    <TextInput
                        placeholder="Your city Name"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => store.user.registerCity(val)} />


                </View>


                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.signIn}
                        onPress={register}
                    >

                        <Text style={[styles.textSign, {
                            color: '#fff'
                        }]}>Sign Up</Text>

                    </TouchableOpacity>


                </View>
            </ScrollView>

        </View >
    )

})

export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    }
});