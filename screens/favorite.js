import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import { icons, images, FONTS, COLORS, SIZES } from '../constants';
import axios from "axios";
import AnimatedLoader from "react-native-animated-loader";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ServiceOfferFavorite } from '../components';
import { LinearGradient } from 'expo-linear-gradient';
import { useFav } from '../context/favContext';


const Favorite = ({ navigation }) => {

    const [data, setData] = useState([]);
    const [isDataNull, setIsDataNull] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [favoriteList, setFavoriteList] = useState(null);
    const fav = useFav();

    const Services = [
        { id: "1", icon: icons.carWash, title: "Car \nwash" },
        { id: "2", icon: icons.carpet, title: "Carpet \nwash" },
        { id: "3", icon: icons.houseClean, title: "House \nclean" },
        { id: "4", icon: icons.antiBug, title: "Anti-\nbug" },
        { id: "5", icon: icons.clean, title: "Garden \nclean" }
    ]

    const getData = async (key, setter) => {
        console.log("data")
        try {
            const jsonValue = await AsyncStorage.getItem(key)
            if (jsonValue !== null) {
                setter(JSON.parse(jsonValue))
            }
        } catch (e) {
            console.log(e);
        }
    }

    //get Ids from local storage
    useEffect(() => {
        setTimeout(() => {
            // if (fav.addedToFav === null || fav.addedToFav) 
            getData('@favoriteList', setFavoriteList)
        }, 500)
        console.log("service favorite =>>> " + JSON.stringify(fav))
    }, [fav])



    //get Data from DB by ids
    useEffect(() => {
        // console.log("favoriteList   =>>>>  " + JSON.stringify(favoriteList));
        if (favoriteList !== null) {
            let ids = []
            for (const [key, value] of Object.entries(favoriteList)) {
                ids.push(value);
            }
            // console.log("ids   =>>>>  " + ids);

            axios.get('http://192.168.1.104:8080/api/services/favorite/' + ids.join(','))
                .then(response => {

                    if (response.data.length >= 0) {
                        setData(response.data)
                        // console.log("working")
                        // setIsDataNull(false)
                    }
                    else {
                        // setIsDataNull(true)
                        setIsLoading(false)
                    }
                }).catch(err => {
                    console.log(err);
                })

        }
    }, [favoriteList])

    useEffect(() => {
        setIsLoading(false)
    }, [data])


    return (
        <View style={[styles.container, { flexDirection: "column" }]}>

            <View style={styles.containerSup} >
            </View>

            <View style={styles.containerList} >
                <View style={{
                    position: 'relative',
                    top: -110,
                    alignSelf: 'center',
                    backgroundColor: COLORS.background,
                    width: 100,
                    height: 100,
                    justifyContent: 'center',
                    borderRadius: 50,
                    alignItems: 'center'
                }} >
                    <Image
                        source={icons.heart}
                        resizeMode="contain"
                        style={{
                            width: 50,
                            height: 50,
                            tintColor: "white",
                        }}
                    />
                </View>

                <Text style={{ ...FONTS.title, color: "black", marginTop: -100 }}> Favorite </Text>
                <AnimatedLoader
                    visible={isLoading}
                    overlayColor="rgba(255,255,255,0.75)"
                    source={require("../assets/loader.json")}
                    animationStyle={styles.lottie}
                    speed={1}
                >
                </AnimatedLoader>

                {!isLoading && (
                    <View style={{ width: "100%" }}>
                        <View style={{ position: 'relative', marginVertical: 10 }}>

                            <LinearGradient
                                colors={['rgba(235, 246, 255,.8)', 'rgba(235, 246, 255,0)']}
                                style={{

                                    position: 'absolute',
                                    zIndex: 100,
                                    marginTop: 9,
                                    width: "100%",
                                    height: 40,
                                    borderBottomLeftRadius: 50,
                                    borderBottomRightRadius: 50
                                }}
                            >
                            </LinearGradient>
                        </View>

                        <ScrollView style={{ width: "100%" }}>
                            <View style={{ height: 900 }}>
                                {data.length > 0 && data.map(item => (
                                    // console.log("id_service favorite == >>> " + item.id_ser)
                                    <ServiceOfferFavorite key={item.id_ser} item={item} services={Services} navigation={navigation} data={data} setData={setData} />
                                ))}
                                {/* console.log("data =>>>>>>>>>>" + JSON.stringify(data)) */}


                            </View>
                        </ScrollView>
                    </View>

                )}
            </View>

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    containerTitre: {
        color: 'black',
        fontSize: 18,
        fontWeight: '600',
    },

    containerLogoList: {
        alignItems: 'center',
        position: 'absolute',
        top: -55,
        left: "25%",
    },
    containerList: {
        flex: 10,
        position: 'relative',
        backgroundColor: "#EBF6FF",
        paddingTop: 60,
        alignItems: 'center',
        borderRadius: 40,
    },
    containerSup: {
        flex: 2,
    },
});


export default Favorite;