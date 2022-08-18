import React, { useState, useEffect, useRef } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { StyleSheet, Dimensions, Animated, View, Text, SafeAreaView, Image } from 'react-native'
import * as Location from 'expo-location';
import { images, icons, SIZES, COLORS, FONTS } from '../constants';
import axios from "axios";
import * as geolib from 'geolib';
import { Button } from '../components';

const Map = ({ navigation }) => {

  const [markers, setMarkers] = useState([]);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [region, setRegion] = useState();
  const [itemPressed, setItemPressed] = useState({});
  const markerDetail = useRef(new Animated.Value(0)).current;

  const getOnlineServices = () => {
    axios.get("http://192.168.1.104:8080/api/employees/online/map").then(res => {
      if (res.data.length > 0) {
        setMarkers(res.data)
      }
    }).catch(err => {
      console.log("error map ==> " + err)
    })
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();

    getOnlineServices()
  }, []);

  useEffect(() => {
    let text = 'Waiting..';

    if (errorMsg)
      text = errorMsg;

    else if (location) {
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
      })
      console.log("location => " + location.coords.latitude)

    }
  }, [location])

  const servicesColors = {
    1: {
      "icon": icons.carWash,
      "color": "#0c88fb",
      "title": "Car wash"
    },
    2: {
      "icon": icons.carpet,
      "color": "#0a6d13",
      "title": "Carpet wash"
    },
    3: {
      "icon": icons.houseClean,
      "color": "#ba4c26",
      "title": "House clean"
    },
    4: {
      "icon": icons.antiBug,
      "color": "#763ce3",
      "title": "Anti-bug"
    },
    5: {
      "icon": icons.clean,
      "color": "#9a1917",
      "title": "Garden clean"
    }
  };

  const modelY = markerDetail.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 70]
  })

  const showDetailsModel = (mark) => {
    let dis = geolib.getDistance(
      { latitude: location.coords.latitude, longitude: location.coords.longitude },
      { latitude: mark.latitude, longitude: mark.longitude }
    );

    var obj = {};
    obj = { ...mark }
    obj.distance = dis;

    setItemPressed(obj);

    Animated.timing(markerDetail, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false
    }).start();
  }

  const viewService = (itemDetail) => {
    Animated.timing(markerDetail, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false
    }).start(() => navigation.navigate("itemDetail", itemDetail));

  }

  const renderMapKey = () => {
    return (
      <View
        style={{
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
          top: 10,
          left: 10,
          backgroundColor: "white",
          borderRadius: 10,
          padding: 7,
          ...Styles.shadow,
        }}
      >
        {Object.keys(servicesColors).map((serColor, index) => (
          <View
            key={index}
            style={{
              backgroundColor: servicesColors[serColor].color,
              width: 65,
              alignItems: "center",
              marginVertical: 3,
              paddingVertical: 2,
              borderRadius: 25,
              shadow: {
                shadowColor: "gray",
                shadowOffset: {
                  width: 0,
                  height: 12,
                },
                shadowOpacity: 0.5,
                shadowRadius: 3.5,
                elevation: 5,
              }
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 10
              }}
            >
              {servicesColors[serColor].title}
            </Text>
          </View>
        ))}
      </View>
    )
  }

  const renderMarkerDetails = () => {
    return (
      <Animated.View
        style={{
          position: "absolute",
          bottom: modelY,
          width: SIZES.width,
          justifyContent: "center",
          alignItems: "center",
          elevation: 20,
          zIndex: 20,
        }}
      >
        <View
          style={{
            width: 250,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: 10,
            paddingVertical: 10,
            ...Styles.shadow,
          }}
        >
          <Image
            source={images.position}
            resizeMode='contain'
            style={{
              width: 50,
              height: 50,
            }}
          />

          <View
            style={{
              marginLeft: 20,
              paddingLeft: 20,
              borderLeftWidth: 1,
              borderColor: "gray"
            }}
          >
            <Text style={{ ...FONTS.smallTitle }}>{itemPressed.services[0].service_name}</Text>
            <Text style={{ width: 130, ...FONTS.desc3, marginTop: -2, marginBottom: 5 }}>{itemPressed.services[0].description}</Text>
            <Text>Distance : {itemPressed.distance / 1000} km</Text>
            <View
              style={{
                marginTop: 10,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Button text="View Service" bgColor={COLORS.darkBlue} paddingVertical={1} onPress={() => viewService(itemPressed.services[0])} />
            </View>
          </View>
        </View>
      </Animated.View>
    );
  }

  return (
    <SafeAreaView>
      <MapView
        style={{
          height: SIZES.height
        }}
        loadingEnabled={true}
        initialRegion={region}
        showsUserLocation={true}
      >
        {markers.map((mark, index) => {
          return (
            <Marker
              key={index}
              coordinate={{ latitude: mark.latitude, longitude: mark.longitude }}
              onPress={() => showDetailsModel(mark)}
            >
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 50,
                  width:20,
                  height:20,
                  justifyContent:"center",
                  alignItems:"center",
                  borderWidth:.2,
                  borderColor:servicesColors[mark.services[0].service_parent].color
                }}
              >
                <Image
                  source={servicesColors[mark.services[0].service_parent].icon}
                  resizeMode="center"
                  style={{
                    width: 13,
                    height: 13,
                    tintColor: servicesColors[mark.services[0].service_parent].color
                  }}
                />
              </View>
            </Marker>
          )
        })}
      </MapView>
      {renderMapKey()}
      {Object.keys(itemPressed).length > 0 && renderMarkerDetails()}
    </SafeAreaView>

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

export default Map