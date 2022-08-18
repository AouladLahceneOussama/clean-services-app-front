import React, { useEffect } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator, ButtomTabBar } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {
    Home, List, Favorite, ItemDetail, SendDemand, SignIn, SignUp, Profile, AddService, ImagePicker,
    ListDemands, ListArticles, Settings, Map, SignUpSuccess, ListDemandsClient, ListDemandsEmployee, Dashboard
} from "../screens";
import { COLORS, SIZES, icons } from '../constants';
import { useSetAuth } from '../context/authContext';
import { useAuth } from '../context/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();
const userStack = createStackNavigator();
const homeStack = createStackNavigator();
const listStack = createStackNavigator();
const demandStack = createStackNavigator();
const mapStack = createStackNavigator();

const Navbar = () => {

    const setAuth = useSetAuth();
    const auth = useAuth();

    const getData = async (key, setter) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key)
            if (jsonValue !== null) {
                setter(JSON.parse(jsonValue))
                console.log(jsonValue)
            }
        } catch (e) {
            console.log('getData : Error' + e);
        }
    }

    useEffect(() => {
        getData('@auth', setAuth)
    }, [])

    const homeStackScreen = () => (
        <homeStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName={auth.isLogged ? "Dashboard" : "home"}
        >
            {auth.isLogged ?
                <homeStack.Screen name="Dashboard" component={Dashboard} />
                :
                (<>
                    <homeStack.Screen name="home" component={Home} />
                    <homeStack.Screen name="itemDetail" component={ItemDetail} />
                    <homeStack.Screen name="sendDemand" component={SendDemand} /></>
                )}
        </homeStack.Navigator>
    )

    const userStackScreen = () => (
        <userStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName={auth.isRegistred ? "SignUpSuccess" : auth.isLogged ? "Profile" : "SignIn"}
        >
            {auth.isLogged ? (
                <userStack.Group>
                    <userStack.Screen name="Profile" component={Profile} />
                    <userStack.Screen name="SignUpSuccess" component={SignUpSuccess} />
                    <userStack.Screen name="Settings" component={Settings} />
                    <userStack.Screen name="AddService" component={AddService} />
                    <userStack.Screen name="imagePicker" component={ImagePicker} />
                </userStack.Group>
            ) : (
                <userStack.Group>
                    <userStack.Screen name="SignIn" component={SignIn} />
                    <userStack.Screen name="SignUp" component={SignUp} />
                </userStack.Group>
            )}
        </userStack.Navigator>
    )

    const favoriteStackScreen = () => (
        <listStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="Favorite"
        >
            <listStack.Screen name="Favorite" component={Favorite} />
        </listStack.Navigator>
    )

    const demandStackScreen = () => (
        <demandStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName={auth.isLogged ? "ListDemandsEmployee" : "ListDemandsClient"}
        >
            {auth.isLogged ?
                <demandStack.Screen name="ListDemandsEmployee" component={ListDemandsEmployee} />
                :
                <demandStack.Screen name="ListDemandsClient" component={ListDemandsClient} />
            }
        </demandStack.Navigator>
    )

    const ListStackScreen = () => (
        <listStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="ListArticles"
        >
            <listStack.Screen name="ListArticles" component={ListArticles} />
        </listStack.Navigator>
    )

    const mapStackScreen = () => (
        <mapStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="map"
        >
            <mapStack.Screen name="map" component={Map} />
        </mapStack.Navigator>
    )

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    borderTopWidth: 0,
                    borderTopLeftRadius: SIZES.radius,
                    borderTopRightRadius: SIZES.radius,
                    elevation: 0,
                    zIndex: 0,
                    ...Styles.shadow,
                    position: "absolute",
                }
            }}
        >
            <Tab.Screen
                name="homeContainer"
                component={homeStackScreen}

                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.home}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.darkBlue : COLORS.skyBlue,
                            }}
                        />
                    )
                }}
            >

            </Tab.Screen>

            <Tab.Screen
                name="demandStackScreen"
                component={demandStackScreen}

                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.list}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.darkBlue : COLORS.skyBlue,
                            }}
                        />
                    )
                }}
            >

            </Tab.Screen>

            {!auth.isLogged && (
                <Tab.Screen
                    name="favoriteContainer"
                    component={favoriteStackScreen}

                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Image
                                source={icons.heart}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? COLORS.darkBlue : COLORS.skyBlue,
                                }}
                            />
                        )
                    }}
                >
                </Tab.Screen>
            )}

            {auth.isLogged && (
                <Tab.Screen
                    name="ListStackScreen"
                    component={ListStackScreen}

                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Image
                                source={icons.cleanNav}
                                resizeMode="contain"
                                style={{
                                    width: 35,
                                    height: 35,
                                    tintColor: focused ? COLORS.darkBlue : COLORS.skyBlue,
                                }}
                            />
                        )
                    }}
                >
                </Tab.Screen>
            )}

            <Tab.Screen
                name="userContainer"
                component={userStackScreen}

                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.user}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.darkBlue : COLORS.skyBlue,
                            }}
                        />
                    )
                }}
            >

            </Tab.Screen>


            <Tab.Screen
                name="mapContainer"
                component={mapStackScreen}

                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.map}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.darkBlue : COLORS.skyBlue,
                            }}
                        />
                    )
                }}
            >
            </Tab.Screen>

        </Tab.Navigator>
    )
}

const Styles = StyleSheet.create({
    shadow: {
        shadowColor: COLORS.darkBlue,
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.5,
        elevation: 5,
    }
})

export default Navbar;