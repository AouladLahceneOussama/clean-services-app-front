import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ScrollView,
    View,
    Text,
    Image,
    ImageBackground
} from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { LinearGradient } from 'expo-linear-gradient';
import { icons, images, FONTS, COLORS, SIZES } from '../constants';
import { Button } from '../components';
import axios from "axios";
import AnimatedLoader from "react-native-animated-loader";

const ItemDetail = ({ route, navigation }) => {

    const itemDetail = route.params;
    const [employee, setEmployee] = useState({})
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log(itemDetail);
        axios.get(`http://192.168.1.104:8080/api/employees/${itemDetail.employee}`).then((res) => {
            if (res.data) {
                setEmployee(res.data);
                setIsLoading(false)
            }
        }).catch(err => {
            console.log("err =>> " + err);
        });
    }, []);

    const reviews = [
        {
            id: 1,
            name: "oussama",
            image: images.user1,
            date: "15/10/2021",
            review: "good service",
            stars: 3,
            starsEmpty: 2,
        },
        {
            id: 2,
            image: images.user1,
            date: "15/10/2021",
            name: "ayat",
            review: "good service",
            stars: 3,
            starsEmpty: 2,
        },
        {
            id: 3,
            image: images.user1,
            date: "15/10/2021",
            name: "nisssrine",
            review: "good service",
            stars: 3,
            starsEmpty: 2,
        },
        {
            id: 4,
            image: images.user1,
            date: "15/10/2021",
            name: "chsymae",
            review: "good service",
            stars: 3,
            starsEmpty: 2,
        },
        {
            id: 5,
            image: images.user1,
            date: "15/10/2021",
            name: "xayma2",
            review: "good service",
            stars: 3,
            starsEmpty: 2,
        },
    ]

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                key={index}
                style={{
                    marginRight: SIZES.margin
                }}
            >
                <Image
                    source={{ uri: `http://192.168.1.104:8080/uploads/${item.name}` }}
                    resizeMode="cover"
                    style={{
                        width: 150,
                        height: 100,
                        borderRadius: SIZES.radius,
                    }}
                />
            </TouchableOpacity>
        )

    }

    const RenderWorkflow = (item, index) => (
        <View
            key={index}
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                borderBottomWidth: 2,
                borderColor: "white"
            }}
        >
            <View
                style={{
                    width: 100,
                    flexDirection: "row",
                    alignItems: "center"
                }}
            >
                <View
                    style={{
                        width: 10,
                        height: 10,
                        borderRadius: 50,
                        backgroundColor: item.statut === "on" ? COLORS.green : COLORS.gray,
                        marginRight: 5
                    }}
                ></View>
                <Text style={{ color: COLORS.gray }} >{item.day}</Text>
            </View>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "space-around",
                    justifyContent: "space-around",
                }}
            >
                <Text>{item.wf_from}</Text>
                <Text
                    style={{
                        marginHorizontal: 20
                    }}
                >-</Text>
                <Text>{item.wf_to}</Text>
            </View>

        </View>
    )

    const renderReviews = ({ item }) => {
        return (
            <View
                style={{
                    backgroundColor: COLORS.white,
                    borderRadius: SIZES.radius,
                    width: 150,
                    height: "100%",
                    marginRight: SIZES.margin,
                    padding: SIZES.padding / 2,
                    alignItems: "center"
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center"
                    }}
                >
                    <Image
                        source={item.image}
                        resizeMode="cover"
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 50,
                            marginRight: 5,
                        }}
                    />
                    <View>
                        <Text style={{ ...FONTS.smallTitle }}>{item.name}</Text>
                        <Text style={{ ...FONTS.inputLabel }}>{item.date}</Text>
                    </View>
                </View>
                <AirbnbRating
                    count={5}
                    defaultRating={item.star}
                    size={10}
                    showRating={false}
                    isDisabled
                    starContainerStyle={{
                        marginTop: 10
                    }}
                />
                <Text style={{ ...FONTS.desc1, paddingTop: 10 }}>{item.review}</Text>
            </View>
        )
    }

    return (
        <SafeAreaView>
            <AnimatedLoader
                visible={isLoading}
                overlayColor="rgba(255,255,255,0.75)"
                source={require("../assets/loader.json")}
                animationStyle={styles.lottie}
                speed={1}
            >
            </AnimatedLoader>

            {!isLoading && (
                <>
                    <View
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "relative",
                        }}
                    >
                        <View style={{
                            position: "absolute",
                            width: "100%",
                            top: 10,
                            left: 0,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            zIndex: 10,
                        }}>

                            <TouchableOpacity
                                style={{
                                    backgroundColor: COLORS.gray,
                                    borderRadius: 50,
                                    padding: SIZES.padding / 5,
                                    marginLeft: SIZES.margin
                                }}
                                onPress={() => { navigation.goBack() }}
                            >
                                <Image
                                    source={icons.backArrow}
                                    resizeMode="contain"
                                    style={{
                                        width: 15,
                                        height: 15,
                                        tintColor: COLORS.white,
                                    }}
                                />
                            </TouchableOpacity>
                        </View>


                        <ImageBackground
                            source={{ uri: `http://192.168.1.104:8080/uploads/${itemDetail?.serviceImages[0].name}` }}
                            resizeMode="cover"
                            style={{
                                width: "100%",
                                height: 180,
                            }}
                            imageStyle={{
                                borderBottomLeftRadius: 500,
                                borderBottomRightRadius: 500
                            }}
                        >
                            <LinearGradient
                                colors={['rgba(232, 246, 255,.2)', 'rgba(232, 246, 255,.7)']}
                                style={{
                                    width: "100%",
                                    height: 180,
                                    borderBottomLeftRadius: 500,
                                    borderBottomRightRadius: 500
                                }}
                            >
                            </LinearGradient>

                        </ImageBackground>

                        <Image
                            source={{ uri: `http://192.168.1.104:8080/uploads/${employee.image}` }}
                            resizeMode="cover"
                            style={{
                                height: 90,
                                width: 90,
                                top: -50,
                                borderRadius: 500,
                                borderColor: COLORS.white,
                                borderWidth: 3,
                            }}
                        />

                        <View
                            style={{
                                marginTop: -35,
                                alignItems: "center",
                            }}
                        >
                            <Text style={FONTS.title}>{itemDetail.service_name}</Text>

                            <AirbnbRating
                                count={5}
                                defaultRating={4}
                                size={15}
                                showRating={false}
                                isDisabled
                            />

                            <Text style={{ color: COLORS.darkBlue, ...FONTS.title }}>{itemDetail.prix} dh</Text>

                            <View
                                style={{
                                    flexDirection: "row",
                                    marginBottom: 10
                                }}
                            >
                                <Button text="On work" bgColor={itemDetail.statut === "on" ? COLORS.green : COLORS.gray} />
                                <Button text="Send demand" bgColor={COLORS.skyBlue} onPress={() => { navigation.push("sendDemand", { employee,itemDetail }) }} />
                            </View>

                        </View>
                    </View>

                    <View
                        style={styles.infoContainer}
                    >
                        <LinearGradient
                            colors={['rgba(235, 246, 255,.8)', 'rgba(235, 246, 255,0)']}
                            style={{
                                position: 'absolute',
                                zIndex: 10,
                                top: 0,
                                right: 0,
                                width: SIZES.width,
                                height: 40,
                                borderTopRightRadius: SIZES.radius * 2,
                                borderTopLeftRadius: SIZES.radius * 2,
                            }}
                        >
                        </LinearGradient>

                        <ScrollView
                            showsVerticalScrollIndicator={false}
                        >
                            <View style={{
                                marginTop: 10,
                                height: 1320
                            }}>

                                <View>
                                    <FlatList
                                        data={itemDetail.serviceImages}
                                        horizontal
                                        endFillColor={COLORS.skyBlue}
                                        showsHorizontalScrollIndicator={false}
                                        renderItem={renderItem}
                                        keyExtractor={item => item.id}
                                        contentContainerStyle={{ marginVertical: SIZES.margin }}
                                    />
                                </View>

                                <Text style={{ ...FONTS.title }}>Description</Text>
                                <Text style={{ ...FONTS.desc2 }}>{itemDetail.description}</Text>

                                <Text style={{ ...FONTS.title, marginTop: 5 }}>Workflow</Text>

                                <View>
                                    {employee !== null ?
                                        employee.workflow.map((w, index) => (
                                            RenderWorkflow(w, index)
                                        )) : (<Text>Nothing to display</Text>)
                                    }
                                </View>

                                <Text style={{ ...FONTS.title, marginTop: 10 }}>Reviews ({reviews.length})</Text>
                                <View>
                                    <FlatList
                                        data={reviews}
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        renderItem={renderReviews}
                                        keyExtractor={item => item.id}
                                        contentContainerStyle={{ marginVertical: SIZES.margin }}
                                    />
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </>
            )}
        </SafeAreaView>
    )
}



const styles = StyleSheet.create({
    infoContainer: {
        paddingHorizontal: SIZES.padding,
        backgroundColor: COLORS.background,
        borderTopRightRadius: SIZES.radius * 2,
        borderTopLeftRadius: SIZES.radius * 2,
        position: "relative"
    },
});

export default ItemDetail;