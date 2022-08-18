import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ImageBackground, Image, TouchableOpacity, Linking } from 'react-native';
import icons from '../constants/icons';
import { COLORS, FONTS } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from './Button';
import axios from "axios";

function DemandEmployee({ item, Services, setShowModal, setSelectedItem }) {

    const [Service, setService] = useState()
    const [employee, setEmployee] = useState()
    const [help, setHelp] = useState();

    const sendWhatsApp = (mobileNumber, statut) => {
        let whatsAppMsg = ""
        if (statut === 1)
            whatsAppMsg = "Bonjour, je suis " + employee.full_name + ", je vous informe que votre demande de service' " + Service.service_name + "' été accepter. \n *CleanX*. "
        if (statut === 0)
            whatsAppMsg = "Bonjour, je suis " + employee.full_name + ", je vous informe que votre demande de service' " + Service.service_name + "' été accepter. \n *CleanX*. "

        let url = 'whatsapp://send?text=' + whatsAppMsg + '&phone=212' + mobileNumber;
        Linking.openURL(url)
            .then((data) => {
                console.log('WhatsApp Opened');
            })
            .catch(() => {
                alert('Make sure Whatsapp installed on your device');
            });
    };

    const changeDemandState = (id, statut) => {

        let test = new FormData();
        test.append("statut", statut);
        axios.put(`http://192.168.1.104:8080/api/demande/update/${id}`, test).then(res => {
        }).catch(err => {
            if (err.response.data !== null)
                setErrors(err.response.data.errors)
        });
    }

    useEffect(() => {
        console.log(item.employe)
        axios.get('http://192.168.1.104:8080/api/services/' + item.service)
            .then(response => {
                setService(response.data)
            })
            .catch(err => {
                console.log(err);
            })

        axios.get('http://192.168.1.104:8080/api/Employees/' + item.employee)
            .then(response => {
                console.log(response.data)
                setEmployee(response.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <View style={styles.container}>
            {/*  image */}

            <View style={styles.imageContainer}>
                <TouchableOpacity style={{ flex: 1 }}
                    onPress={() => { setShowModal(true); setSelectedItem(item) }}

                >
                    <ImageBackground style={{ flex: 1 }} source={require("../assets/images/service-1.jpg")}>
                    </ImageBackground>
                    {/* source={item.image1}> */}
                </TouchableOpacity>

            </View>


            {/* right panel */}
            <View style={styles.infoContainer}>
                {/* service name */}
                <View style={{ height: 30, flexDirection: "row", justifyContent: 'space-between' }}>
                    <View>
                        <Text style={{ ...FONTS.title }}> {Services[parseInt(item?.service) - 1]?.title.replace("\n", " ")} </Text>
                    </View>
                    <TouchableOpacity style={{
                        width: 28,
                        height: 28,
                        marginTop: 3,
                        marginRight: 5
                    }}
                        onPress={() => { setShowModal(true); setSelectedItem(item) }}
                    >

                        <View style={{
                            width: 28,
                            height: 28,
                            flexDirection: "row",
                            borderRadius: 50,

                        }}
                        >
                            <Image
                                style={{ tintColor: COLORS.gray, position: 'relative', height: "70%", width: "70%", alignSelf: 'center' }}
                                source={icons.plus}>
                            </Image>
                        </View>
                    </TouchableOpacity>
                </View>


                {/* Date */}
                <View style={{ flex: 1, paddingLeft: 10 }}>
                    <Text> date  : {item.date}</Text>
                    <Text> time  : {item.time.substring(0,5)}</Text>
                    <Text> phone : {item.phone}</Text>
                </View>

                <View style={{
                    height: 30, width: 130, alignSelf: 'flex-end', alignItems: 'center', justifyContent: 'center'
                    , flexDirection: 'row'
                }}>

                    <Button bgColor={COLORS.darkRed} text="Refuse" width={60} onPress={() => {
                        changeDemandState(item.id_demand, "refuse")
                        sendWhatsApp(item.phone , 0);
                    }} />
                    <Button bgColor={COLORS.green} text="Accept" width={60} onPress={() => {
                        changeDemandState(item.id_demand, "accept")
                        sendWhatsApp(item.phone,1)

                    }} />
                </View>


            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        borderRadius: 20,
        alignSelf: 'center',
        width: 350,
        height: 120,
        flexDirection: "row",
    },
    imageContainer: {
        width: 120,

    },
    infoContainer: {
        backgroundColor: "#fff",
        flex: 1,

    }
})
export default DemandEmployee;