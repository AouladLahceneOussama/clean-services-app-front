import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    ScrollView,
    SafeAreaView,
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import { icons, FONTS, COLORS, SIZES } from '../constants';
import { Button } from '../components'
import { useSetAuth } from '../context/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage'


function Dashboard({ navigation }) {

    const setAuth = useSetAuth();

    const storeData = async (key, value) => {
        console.log("im in stor  data" + JSON.stringify(value))
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem(key, jsonValue)
        } catch (e) {
            console.log('storeData : Error' + e);
        }
    }

    const logout = () => {
        console.log("click")
        setAuth({ "isLogged": false, "phone": "" })
        storeData('@auth', { "isLogged": false, "phone": "" })
    }

    return (
        <ScrollView>
            <View
                style={{
                    height: SIZES.height,
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Text
                    style={{
                        ...FONTS.title
                    }}
                >
                    Welcome to our application
                </Text>

                <Image
                    source={require("../assets/Logo.png")}
                    resizeMode="contain"
                    style={{
                        width: 300,
                        height: 300,
                        marginBottom: 10
                    }}
                />
                <Button onPress={() => { logout() }} text="Logout" bgColor={COLORS.darkBlue} paddingVertical={5} width={150} />
            </View>

        </ScrollView>
    )
}

export default Dashboard;