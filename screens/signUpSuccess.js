import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { icons, images, FONTS, COLORS, SIZES } from '../constants';
import { useAuth } from '../context/authContext';

const SignUpSuccess = ({ navigation }) => {

    const auth = useAuth();

    useEffect( () => {
        console.log("auth ============= >>>> " + JSON.stringify(auth))
    }, [])
    return (
        <SafeAreaView>
            <View
                style={{
                    height: SIZES.height,
                    width: SIZES.width,
                    backgroundColor: COLORS.background,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop:-20
                }}
            >
                <View
                    style={{
                        alignItems: "center"
                    }}
                >
                    <Image
                        source={images.signUpDone}
                        resizeMode="cover"
                        style={{
                            width: 280,
                            height: 280,
                            marginBottom:10
                        }}
                    />
                    <Text
                        style={{
                            ...FONTS.smallTitle
                        }}
                    >
                        You have created your account successfully,
                    </Text>
                    <Text
                        style={{
                            ...FONTS.desc2,
                            textAlign:"center"
                        }}
                    >
                        Please complete the settings to make you account looks nice,
                    </Text>
                    <TouchableOpacity
                        style={{
                            width: 200,
                            marginTop: 30,
                            borderColor: "white",
                            alignItems: "center",
                            borderWidth: 3,
                            backgroundColor: COLORS.darkBlue,
                            paddingHorizontal: 10,
                            paddingVertical: 10,
                            borderRadius: 25
                        }}
                        onPress={() => {navigation.navigate("Settings")}}
                    >
                        <Text
                            style={{
                                color: "white",
                                ...FONTS.smallTitle
                            }}
                        >
                            Go to settings
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({

});

export default SignUpSuccess;