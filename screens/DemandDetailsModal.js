import react, { useEffect } from 'react';
import React, { useState, useRef } from 'react';
import { Modal, Animated, TouchableWithoutFeedback, View, Text, Image, Platform, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES, icons } from '../constants';
import { ScrollView } from 'react-native-gesture-handler';
import axios from "axios";


function DemandDetailsModal({ isVisible, onClose, item }) {

    const [ShowDemandDetailsModal, setShowDemandDetailsModal] = useState(isVisible)
    const modalAnimatedValue = useRef(new Animated.Value(0)).current;
    const [Service, setService] = useState({})

    useEffect(() => {
        axios.get('http://192.168.1.104:8080/api/services/' + item.service)
            .then(response => {
                setService(response.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    useEffect(() => {
        if (ShowDemandDetailsModal) {
            Animated.timing(modalAnimatedValue, {
                toValue: 1,
                duration: 500,
                useNativeDriver: false
            }).start();
        }
        else {
            Animated.timing(modalAnimatedValue, {
                toValue: 0,
                duration: 500,
                useNativeDriver: false
            }).start(() => onClose());
        }
    }, [ShowDemandDetailsModal])

    const modelY = modalAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [700, 200]
    })
    // react.useEffect(() => {
    //     if(!ShowDemandDetailsModal)
    //    { onClose()}
    // },[ShowDemandDetailsModal])

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
        >
            <View style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,.5)'
            }}>
                <TouchableWithoutFeedback
                    onPress={() => setShowDemandDetailsModal(false)}
                >
                    <View style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                    }}></View>
                </TouchableWithoutFeedback>

                <Animated.View style={{
                    position: 'absolute',
                    backgroundColor: COLORS.background,
                    left: 0,
                    width: "100%",
                    height: "80%",
                    // padding: 50,
                    borderTopLeftRadius: 50,
                    borderTopRightRadius: 50,
                    top: modelY
                }}>

                    <View style={{
                        position: 'relative',
                        top: -60,
                        alignSelf: 'center',
                        backgroundColor: COLORS.background,
                        width: 120,
                        height: 120,
                        justifyContent: 'center',
                        borderRadius: 80,
                        alignItems: 'center',
                    }} >
                        <Image
                            source={icons.plus}
                            resizeMode="contain"
                            style={{
                                width: 60,
                                height: 60,
                                tintColor: "white",
                            }}
                        />
                    </View>
                    <Text style={{ marginTop: -60, alignSelf: 'center', ...FONTS.title, color: "black" }}> Requests Details  </Text>

                    <ScrollView
                        style={{ padding: 50 }}
                        showsVerticalScrollIndicator={true}
                        fadingEdgeLength={10}
                        contentContainerStyle={{
                            backgroundColor: "transparent",
                            height: Platform.OS === 'ios' ? 900 : 660
                        }}

                    >

                        <Text style={{ ...FONTS.desc1, fontWeight: "bold" }}>Full name </Text>
                        <View style={styles.input}>
                            <Text>{item.client_name} </Text>
                        </View>
                        <Text style={{ ...FONTS.desc1, fontWeight: "bold" }}>Date </Text>
                        <View style={styles.input}>
                            <Text>{item.date} </Text>
                        </View>
                        <Text style={{ ...FONTS.desc1, fontWeight: "bold" }}>Time  </Text>
                        <View style={styles.input}>
                            <Text>{item.time.substring(0,5)} </Text>
                        </View>
                        <Text style={{ ...FONTS.desc1, fontWeight: "bold" }}>Phone  </Text>
                        <View style={styles.input}>
                            <Text>{item.phone} </Text>
                        </View>
                        <Text style={{ ...FONTS.desc1, fontWeight: "bold" }}>Address  </Text>
                        <View style={styles.input}>
                            <Text>{item.adress} </Text>
                        </View>
                        <Text style={{ ...FONTS.desc1, fontWeight: "bold" }}>Service  </Text>
                        <View style={styles.input}>
                            <Text>{Service.service_name} </Text>
                        </View>
                        <Text style={{ ...FONTS.desc1, fontWeight: "bold" }}>Description  </Text>
                        <View style={styles.input}>
                            <Text>{item.description}  </Text>
                        </View>


                        <View style={{ ...styles.input, alignSelf: "center", width: 120, alignItems: "center" }}>
                            <Text style={{ ...FONTS.desc1, fontWeight: "bold", color: COLORS.red }}> Total  </Text>
                            <Text style={{ ...FONTS.desc1, fontWeight: "bold", color: COLORS.red }}>{Service.prix} DH </Text>
                        </View>

                    </ScrollView>

                </Animated.View>
            </View>
        </Modal>
    );
}
const styles = StyleSheet.create({
    input: {
        padding: 5,
        paddingLeft: 10,
        marginVertical: SIZES.margin,
        lineHeight: -10,
        width: "98%",
        color: "black",
        borderColor: 'white',
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 25,
        justifyContent: "center"

    },
})

export default DemandDetailsModal;