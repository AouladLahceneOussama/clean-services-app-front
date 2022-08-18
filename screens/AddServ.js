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
import axios from 'axios';
import { icons, FONTS, COLORS, SIZES } from '../constants';
import { Button, Input } from '../components'
import { useAuth } from '../context/authContext';
import { Picker } from '@react-native-picker/picker';

function AddService({ route, navigation }) {

    const [listImages, setListImages] = useState([])
    const [selectedService, setSelectedService] = useState(0);
    const auth = useAuth();

    useEffect(() => {
        if (route["params"] !== undefined)
            setListImages(route.params.data)
    }, [route]);

    useEffect(() => {
        setListImages(listImages)
    }, [listImages]);

    const ImagesList = () => (
        <View
            style={{
                width: SIZES.width - SIZES.margin * 6,
                flexDirection: "row",
                alignItems:"center",
                alignContent:"center",
                justifyContent: "center",
                flexWrap: "wrap"
            }}
        >
            {listImages.map((image) => (
                <Image
                    key={image.id}
                    source={{ uri: image.uri }}
                    resizeMode="cover"
                    style={{
                        marginTop: 10,
                        width: 60,
                        height: 60,
                        borderRadius: 10,
                        margin: 5
                    }}
                />
            ))}
        </View>
    );

    const [data, setData] = useState({
        "employee": auth.phone,
        "service_name": "",
        "service_parent": selectedService,
        "prix": "",
        "description": "",
        "statut": "on",
    });

    const AddServiceToDb = () => {

        let formdata = new FormData();
        formdata.append("employee", data.employee);
        formdata.append("service_name", data.service_name);
        formdata.append("service_parent", data.service_parent);
        formdata.append("prix", data.prix);
        formdata.append("description", data.description);
        formdata.append("city", data.city);
        formdata.append("statut", data.statut);
        formdata.append("images", listImages);

        axios.post('http://192.168.1.104:8080/api/services/addService', formdata).then(res => {
            if (res.data === "ok") {
                console.log(res.data);
                navigation.push("Profile")
            }
        }).catch((error) => {
            console.log("error : " + error);
        });
    }


    return (
        <View style={styles.container} >
            <TouchableOpacity
                style={{
                    position: "absolute",
                    top: 20,
                    left: 20,
                    backgroundColor: COLORS.skyBlue,
                    padding: SIZES.padding / 5,
                    borderRadius: 50,
                    elevation: 10
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
                    marginTop: 100,
                    backgroundColor: COLORS.background,
                    alignItems: 'center',
                    borderTopRightRadius: 30,
                    borderTopLeftRadius: 30,
                    position: "relative"
                }}
            >
                <View style={{
                    position: 'absolute',
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
                        source={icons.cleanNav}
                        resizeMode="contain"
                        style={{
                            width: 60,
                            height: 60,
                            tintColor: "white",
                        }}
                    />
                </View>

                <View
                    style={{
                        marginTop: 30,
                        marginBottom: 10,
                    }}
                >
                    <Text style={{ ...FONTS.title, color: "black" }} >Add Your Service</Text>
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{ paddingBottom: 150 }}>
                        <View style={{ height: Platform.OS === 'ios' ? 230 : 75 }}>
                            <Text style={{ ...FONTS.inputLabel, margin: Platform.OS === 'ios' ? 0 : 0 }}>
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
                        <Input label="Title" name="service_name" setData={setData} data={data} />
                        <Input label="Price" name="prix" setData={setData} data={data} />
                        <Input label="City" name="city" setData={setData} data={data} />
                        <Input label="Description" name="description" setData={setData} data={data} multiline />

                        <Text>Images</Text>
                        <Text style={{ ...FONTS.desc2, color: COLORS.gray, paddingVertical: 5 }}>
                            P.S : The first picture you choose will be the main one
                        </Text>
                        <Button text="Add images" bgColor={COLORS.skyBlue} onPress={() => navigation.push('imagePicker')} />

                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={{ flexDirection: "row" }}>
                                {listImages.length > 0 ?
                                    (<ImagesList />) :
                                    (<View style={{ position: "relative" }}>
                                        <TouchableOpacity style={styles.bout}>
                                            <Image style={{ tintColor: 'gray', marginTop: 15, marginLeft: 16, width: 30, height: 30 }} source={icons.image} />
                                        </TouchableOpacity>
                                    </View>
                                    )}

                            </View>
                        </ScrollView>

                        <View style={{ alignItems: "center", marginTop: 10 }}>
                            <Button text="Send" bgColor={COLORS.skyBlue} onPress={() => { AddServiceToDb() }} width={300} />
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: 'white',
        paddingBottom: 50
    },

    bout: {
        marginTop: 20,
        marginLeft: 10,
        width: 60,
        height: 60,
        color: "black",
        backgroundColor: "white",
        borderRadius: 10,
    },

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
});

export default AddService;