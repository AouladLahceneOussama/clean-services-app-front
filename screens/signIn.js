import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Text,
} from 'react-native';

import { COLORS, SIZES, FONTS, icons } from '../constants';
import { Input, Button } from '../components';
import axios from 'axios';
import { useSetAuth } from '../context/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Location from 'expo-location';

const SignIn = ({ navigation }) => {

    const setAuth = useSetAuth();
    const [errorLogin, setErrorLogin] = useState("");
    const [login, setLogin] = useState({
        "phone": "",
        "password": "",
        "latitude": 0.00,
        "longitude": 0.00,
    });
    const [location, setLocation] = useState(null);

    const storeData = async (key, value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem(key, jsonValue)
        } catch (e) {
            console.log('storeData : Error ' + e);
        }
    }

    const signIn = async () => {
        let location = await Location.getCurrentPositionAsync({});
       
        login.latitude = location.coords.latitude
        login.longitude = location.coords.longitude
        
        if (login.phone !== "" && login.password !== "") {
            axios.post("http://192.168.1.104:8080/api/employees/login", login).then(res => {
                if (res.data === "logged") {
                    storeData('@auth', { "isLogged": true, "isRegistred": false, "phone": login.phone })
                    setAuth({ "isLogged": true, "isRegistred": false, "phone": login.phone });
                }
                else if (res.data === "unlogged") {
                    setErrorLogin("Wrong credentials")
                }
            }).catch(err => {
                if (err.response.data !== null)
                    setErrors(err.response.data.errors)
            });
        }
        else
            setErrorLogin("Please fill the form")

    }


    return (
        <SafeAreaView style={styles.container}>

            <View
                style={{
                    justifyContent: 'space-between',
                    alignItems: "center",
                    height: SIZES.height / 1.6,
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center"
                    }}
                >
                    <Text style={{ ...FONTS.bigTitle, color: COLORS.skyBlue }}>
                        LOGIN
                    </Text>
                </View>

                <View >
                    {errorLogin !== "" ? (
                        <Text
                            style={{
                                backgroundColor: "#F66D6D",
                                color: "white",
                                borderRadius: 25,
                                paddingVertical: 5,
                                textAlign: "center",
                                fontSize: 11,
                                fontWeight: "bold",
                                marginBottom: 15,

                            }}
                        >
                            {errorLogin}
                        </Text>
                    )
                        :
                        <></>
                    }
                    <Input label="Phone" name="phone" data={login} setData={setLogin} />
                    <Input label="Password" password icon={icons.eye} name="password" data={login} setData={setLogin} />
                    <Text style={{ ...FONTS.desc2, textDecorationLine: "underline", color: COLORS.gray, marginBottom: 30 }}>
                        Forgot password ?
                    </Text>
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Button text="Login" bgColor={COLORS.skyBlue} onPress={() => { signIn() }} />
                    </View>

                </View>

                <View style={{ alignItems: "center" }}>
                    <Text style={{ ...FONTS.smallTitle, textDecorationLine: "underline" }}>
                        You don't have account ?
                    </Text>
                    <TouchableOpacity onPress={() => { navigation.push("SignUp") }}>
                        <Text style={{ ...FONTS.title }}>Register One</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        width: SIZES.width,
        height: SIZES.height,
        backgroundColor: COLORS.background
    }
});

export default SignIn;