import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
import icons from '../constants/icons';
import { COLORS, FONTS } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSetFav } from '../context/favContext';
import { useFav } from '../context/favContext';

function ServiceOffer({ item, services, navigation }) {

    const [addedToFavorite, setAddedToFavorite] = useState(null); // hadi makhsaxi d bqa false khs n jibu m local  storage !!!!!
    const [addedToFavoriteHelp, setAddedToFavoriteHelp] = useState({}); // hadi makhsaxi d bqa false khs n jibu m local  storage !!!!!

    const [favoriteList, setFavoriteList] = useState(null); // hadi makhsaxi d bqa false khs n jibu m local  storage !!!!!
    const [favoriteListHelp, setFavoriteListHelp] = useState(null); // hadi makhsaxi d bqa false khs n jibu m local  storage !!!!!
    const setFav = useSetFav();
    const fav = useFav();

    const storeData = async (key, value) => {
        // console.log("im in stor  data" + JSON.stringify(value))
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem(key, jsonValue)
        } catch (e) {
            console.log('storeData : Error');
        }
    }

    const getData = async (key, setter) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key)
            if (jsonValue !== null) {
                setter(JSON.parse(jsonValue))
            }
        } catch (e) {
            console.log('getData : Error');
        }
    }

    const favorite = () => {
        setAddedToFavorite(!addedToFavorite)
        setFav({ "addedToFav": !addedToFavorite, "idService": item.id_ser })
        getData('@favoriteList', setFavoriteListHelp);
    }

    useEffect(() => {

        setTimeout(() => {
            if (fav.addedToFav === null || (!fav.addedToFav && fav.idService === item.id_ser))
                getData('@favoriteList', setAddedToFavoriteHelp)
        }, 500)

    }, [fav])

    useEffect(() => {
        if (addedToFavoriteHelp[`${item.id_ser}`] === `${item.id_ser}`)
            setAddedToFavorite(true)

    }, [addedToFavoriteHelp])

    useEffect(() => {
        if (addedToFavorite) {
            if (favoriteListHelp !== null) {
                setFavoriteList({
                    ...favoriteListHelp,
                    [item.id_ser]: `${item.id_ser}`

                });
            }
            else {
                setFavoriteList({ [item.id_ser]: `${item.id_ser}` });
            }
        }
        else {
            if (favoriteListHelp !== null) {
                let test = { test: (delete favoriteListHelp[`${item.id_ser}`], favoriteListHelp) };
                setFavoriteList(test.test)
            }
            else {
                setFavoriteList({});
            }
        }
    }, [favoriteListHelp])

    useEffect(() => {
        if (favoriteListHelp !== null)
            storeData('@favoriteList', favoriteList)
    }, [favoriteList])

    return (
        <View style={styles.container}>
            {/*  image */}
            <View style={styles.imageContainer}>
                <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.push("itemDetail", item)}>
                    <ImageBackground style={{ flex: 1 }} source={{ uri: `http://192.168.1.104:8080/uploads/${item?.serviceImages[0].name}` }}>
                    </ImageBackground>
                </TouchableOpacity>
            </View>

            {/* right panel */}
            <View style={styles.infoContainer}>

                <View
                    style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        elevation: 10,
                        zIndex: 10
                    }}
                >
                    <TouchableOpacity
                        style={{
                            width: 28,
                            height: 28,
                            marginTop: 3,
                            marginRight: 5
                        }}
                        onPress={() => favorite()}
                    >

                        <View style={{
                            width: 28,
                            height: 28,
                            flexDirection: "row",
                            borderRadius: 50,
                            backgroundColor: addedToFavorite ? COLORS.green : COLORS.lightGray,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        >
                            <Image
                                style={{ tintColor: "#fff", position: 'relative', height: "50%", width: "50%", alignSelf: 'center' }}
                                source={icons.heart}>
                            </Image>
                        </View>
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        marginTop: 8
                    }}
                >
                    <Text
                        style={{
                            ...FONTS.inputLabel,
                            color: "black",
                            paddingLeft: 7
                        }}
                    > {item.service_name} </Text>
                </View>
                <View>
                    <Text style={{ ...FONTS.desc2, paddingLeft: 7 }}> {services[parseInt(item.service_parent) - 1].title.replace("\n", " ")} </Text>
                </View>

                {/* descreption */}
                <View style={{ flex: 1, paddingHorizontal: 10, paddingTop: 5 }}>
                    <Text style={{ ...FONTS.desc3, color: COLORS.textGray }}>
                        {item.description}
                    </Text>
                </View>
                <View style={{ height: 30, width: 80, alignSelf: 'flex-end', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 18, color: COLORS.textBlue }}>
                        {item.prix} DH
                    </Text>
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
        width: "90%",
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
export default ServiceOffer;