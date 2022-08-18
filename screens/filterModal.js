import react from 'react';
import React, { useState, useRef } from 'react';
import { Modal, Animated, TouchableWithoutFeedback, View, Text, Image, Platform, StyleSheet } from 'react-native';

import { COLORS, FONTS, SIZES, icons } from '../constants';
import { Button, TwoPointsSlieder } from '../components';
import { Picker } from '@react-native-picker/picker';
import { ScrollView } from 'react-native-gesture-handler';


function FilterModal({ isVisible, onClose, filter, setFilter }) {

    const [ShowFilterModal, setShowFilterModal] = useState(isVisible)
    const modalAnimatedValue = useRef(new Animated.Value(0)).current;

    const [selectedService, setSelectedService] = useState(filter.service);
    const [selectedCity, setSelectedCity] = useState(filter.city);
    const [price, setPrice] = useState(filter.price);

    const applyFilter = () => {
        setFilter(
            {
                "service": selectedService,
                "city": selectedCity,
                "price": price
            }

        )
        setShowFilterModal(false)
    }

    react.useEffect(() => {
        if (ShowFilterModal) {
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
    }, [ShowFilterModal])

    const modelY = modalAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [700, 200]
    })
    // react.useEffect(() => {
    //     if(!ShowFilterModal)
    //    { onClose()}
    // },[ShowFilterModal])

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
                    onPress={() => setShowFilterModal(false)}
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
                        top: -50,
                        alignSelf: 'center',
                        backgroundColor: COLORS.background,
                        width: 100,
                        height: 100,
                        justifyContent: 'center',
                        borderRadius: 50,
                        alignItems: 'center'
                    }} >
                        <Image
                            source={icons.filter}
                            resizeMode="contain"
                            style={{
                                width: 50,
                                height: 50,
                                tintColor: "white",
                            }}
                        />
                    </View>
                    <ScrollView
                        style={{ padding: 50 }}
                        showsVerticalScrollIndicator={true}
                        fadingEdgeLength={10}
                        contentContainerStyle={{
                            backgroundColor: "transparent",
                            height: Platform.OS === 'ios' ? 800 : 560
                        }}
                    >

                        <View style={{ height: Platform.OS === 'ios' ? 230 : 110 }}>
                            <Text style={{ ...FONTS.smallTitle, margin: Platform.OS === 'ios' ? 0 : 0 }}>
                                Service
                            </Text>
                            <View style={styles.input}>

                                <Picker
                                    style={{
                                        position: "relative",
                                        top: -10
                                    }}

                                    selectedValue={selectedService}
                                    onValueChange={(itemValue, itemIndex) => setSelectedService(itemValue)}

                                    dropdownIconColor={COLORS.skyBlue}
                                    dropdownIconRippleColor="transparent"
                                >
                                    <Picker.Item label="please select ..." value="0" style={{ ...FONTS.smallTitle }} />
                                    <Picker.Item label="Car Wash" value="1" style={{ ...FONTS.smallTitle }} />
                                    <Picker.Item label="Carpet wash" value="2" style={{ ...FONTS.smallTitle }} />
                                    <Picker.Item label="House cleaning" value="3" style={{ ...FONTS.smallTitle }} />
                                    <Picker.Item label="Anti bugs" value="4" style={{ ...FONTS.smallTitle }} />
                                    <Picker.Item label="Garden clean" value="5" style={{ ...FONTS.smallTitle }} />
                                </Picker>
                            </View>
                        </View>
                        <View style={{ height: Platform.OS === 'ios' ? 230 : 110 }}>
                            <Text style={{ ...FONTS.smallTitle, margin: Platform.OS === 'ios' ? 0 : 0 }}>
                                City
                            </Text>
                            <View style={styles.input}>

                                <Picker
                                    style={{
                                        position: "relative",
                                        top: -10
                                    }}

                                    selectedValue={selectedCity}
                                    onValueChange={(itemValue, itemIndex) => setSelectedCity(itemValue)}

                                    dropdownIconColor={COLORS.skyBlue}
                                    dropdownIconRippleColor="transparent"
                                >
                                    <Picker.Item label="Please select ..." value="0" style={{ ...FONTS.smallTitle }} />
                                    <Picker.Item label="Tangier" value="Tangier" style={{ ...FONTS.smallTitle }} />
                                    <Picker.Item label="Tetouan" value="Tetouan" style={{ ...FONTS.smallTitle }} />
                                    <Picker.Item label="Rabat" value="Rabat" style={{ ...FONTS.smallTitle }} />
                                    <Picker.Item label="Casablanca" value="Casablanca" style={{ ...FONTS.smallTitle }} />
                                    <Picker.Item label="Agadir" value="agadir" style={{ ...FONTS.smallTitle }} />
                                </Picker>
                            </View>
                        </View>
                        <View style={{ height: 100 }}>
                            <Text style={{ ...FONTS.smallTitle }}>
                                Prices
                            </Text>
                            <View style={{
                                alignItems: 'center'
                            }}>

                                <TwoPointsSlieder
                                    values={price}
                                    min={10}
                                    max={500}
                                    postfix="DH"
                                    onValuesChange_Price={(values) => setPrice(values)}
                                />
                            </View>
                        </View>

                        <View style={{
                            height: 110,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Button
                                onPress={() => { applyFilter() }}
                                text="Apply"
                                bgColor={COLORS.darkBlue}
                                paddingVertical={10}

                            />
                        </View>

                    </ScrollView>
                </Animated.View>
            </View>
        </Modal>
    );
}
const styles = StyleSheet.create({
    input: {
        paddingLeft: 10,
        marginVertical: SIZES.margin,
        lineHeight: -10,
        height: 30,
        width: "100%",
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
})

export default FilterModal;