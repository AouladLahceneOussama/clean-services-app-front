import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Text,
} from 'react-native';
import { COLORS, SIZES, FONTS, icons } from '../constants';
import { Button, Input } from '../components';
import axios from 'axios';
import { useSetAuth } from '../context/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage'

const SignIn = ({ navigation }) => {

    const setAuth = useSetAuth();
    const [signUp, setSignUp] = useState({
        "full_name": "",
        "phone": "",
        "password": "",
        "confirmPass": "",
    });

    const [errors, setErrors] = useState([]);
    const [passMatched, setPassMatched] = useState("");
    const [errorRegister, setErrorRegister] = useState("");

    const storeData = async (key, value) => {
        console.log("im in stor  data" + JSON.stringify(value))
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem(key, jsonValue)
        } catch (e) {
            console.log('storeData : Error' + e);
        }
    }

    const sinUp = () => {
        if (signUp.full_name !== "" && signUp.phone !== "" && signUp.password !== "" && signUp.confirmPass !== "") {
            if (signUp.password === signUp.confirmPass) {
                axios.post("http://192.168.1.104:8080/api/employees/add", signUp).then(res => {
                    console.log(res.data)
                    if (res.data === "saved") {
                        storeData('@auth', { "isLogged": true, "isRegistred": false, "phone": signUp.phone })
                        setAuth({ "isLogged": true, "isRegistred": true, "phone": signUp.phone });
                        // navigation.push("SignUpSuccess");
                        // setTimeout(() => {
                        //     console.log("balbla")
                        //     
                        // }, 200)
                    }
                    else if (res.data === "Duplicate id") {
                        setErrorRegister("This phone number exist")
                    }
                }).catch(err => {
                    if (err.response !== undefined) {
                        console.log("err.response.data ===> " + JSON.stringify(err.response))
                        setErrors(err.response.data.errors)
                    }
                });
            } else {
                setPassMatched("make sure the passwords are matched")
            }
        }
        else
            setErrorRegister("Please fill the form")

    }

    return (
        <SafeAreaView style={styles.container}>

            <TouchableOpacity
                style={{
                    position: "absolute",
                    top: 20,
                    left: 20,
                    backgroundColor: COLORS.skyBlue,
                    padding: SIZES.padding / 5,
                    borderRadius: 50
                }}

                onPress={() => navigation.goBack()}
            >
                <Image
                    source={icons.backArrow}
                    resizeMode="contain"
                    style={{
                        width: 15,
                        height: 15,
                        tintColor: COLORS.background
                    }}
                />
            </TouchableOpacity>

            <View
                style={{
                    justifyContent: 'center',
                    alignItems: "center",
                    marginTop: -50
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center"
                    }}
                >
                    <Text style={{ ...FONTS.bigTitle, color: COLORS.skyBlue }} >
                        SIGN UP
                    </Text>
                </View>

                {errorRegister !== "" ? (
                    <Text
                        style={{
                            width: "80%",
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
                        {errorRegister}
                    </Text>
                )
                    :
                    <></>
                }

                <View style={{ marginBottom: 10 }}>
                    <Input label="Fullname" name="full_name" data={signUp} setData={setSignUp} />

                    {errors.length > 0 && errors.find(e => e.field === "full_name") !== undefined ? (
                        <Text
                            style={{
                                color: "red",
                                fontSize: 11,
                                fontWeight: "bold",
                                marginTop: -7,
                                marginLeft: 10
                            }}
                        >
                            {errors.find(e => e.field === "full_name").defaultMessage}
                        </Text>
                    )
                        :
                        <></>
                    }

                    <Input label="Phone" name="phone" data={signUp} setData={setSignUp} />
                    {errors.length > 0 && errors.find(e => e.field === "phone") !== undefined ? (
                        <Text
                            style={{
                                color: "red",
                                fontSize: 11,
                                fontWeight: "bold",
                                marginTop: -7,
                                marginLeft: 10
                            }}
                        >
                            {errors.find(e => e.field === "phone").defaultMessage}
                        </Text>
                    )
                        :
                        <></>
                    }

                    <Input label="Password" icon={icons.eye} password name="password" data={signUp} setData={setSignUp} />
                    {errors.length > 0 && errors.find(e => e.field === "password") !== undefined ? (
                        <Text
                            style={{
                                color: "red",
                                fontSize: 11,
                                fontWeight: "bold",
                                marginTop: -7,
                                marginLeft: 10
                            }}
                        >
                            {errors.find(e => e.field === "password").defaultMessage}
                        </Text>
                    )
                        :
                        <></>
                    }

                    <Input label="Confirm Password" password name="confirmPass" data={signUp} setData={setSignUp} />
                    {passMatched !== "" ? (
                        <Text
                            style={{
                                color: "red",
                                fontSize: 11,
                                fontWeight: "bold",
                                marginTop: -7,
                                marginLeft: 10
                            }}
                        >
                            {passMatched}
                        </Text>
                    )
                        :
                        <></>
                    }
                </View>

                <Button text="Sign Up" bgColor={COLORS.skyBlue} onPress={() => sinUp()} />
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
    },
    input: {
        paddingLeft: 10,
        marginBottom: SIZES.margin,
        lineHeight: -10,
        height: 30,
        width: SIZES.width - 100,
        color: "black",
        borderColor: 'white',
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0,
        shadowRadius: 4.65,
        elevation: 6
    },
});

export default SignIn;