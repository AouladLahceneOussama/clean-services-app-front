import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import { Input, Boutton } from '../components'
import { icons, FONTS, COLORS, SIZES } from '../constants'
import { AirbnbRating } from 'react-native-ratings';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { useAuth } from '../context/authContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LinearGradient } from 'expo-linear-gradient';

function SendDemand({ route, navigation }) {

  const auth = useAuth();
  const [data, setData] = useState({
    "employee": route.params.employee.phone,
    "service": { "id_ser": route.params.itemDetail.id_ser },
    "client_name": "",
    "phone": "",
    "adress": "",
    "position_gps": "25654",
    "description": "",
    "date": "",
    "time": "",
    "statut": "in progress"
  });

  useEffect(() => {
    console.log("item deakspofdsa === >> " + JSON.stringify(route.params.itemDetail.prix))
  }, [])

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (selectedDate) => {
    const date = selectedDate.nativeEvent.timestamp || date;
    setShow(Platform.OS === 'ios');
    const newData = { ...data };

    if (mode === "date") {
      newData.date = date.getUTCFullYear() + "-" + date.getUTCMonth() + 1 + "-" + date.getUTCDate();
    }
    if (mode === "time")
      newData.time = date.getHours() + ":" + date.getMinutes() + ":00";


    setData(newData);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const storeData = async (key, value) => {
    console.log("im in stor  data" + JSON.stringify(value))
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
      console.log('storeData : Error');
    }
  }

  function AddDemand() {

    axios.post('http://192.168.1.104:8080/api/demands/add', data).then(res => {
      console.log(res);
      storeData('@ClientPhone', data.phone)
      alert("Demand sent successfully");
    }).catch((error) => {
      console.log("error" + error);
      alert(error.message);
    });

    let times = data.time.split(":");
    let time = times[0] + " Heures et " + times[1] + " Minutes";

    let url =
      'whatsapp://send?text=Bonjour! je m\'appelle : ' + data.client_name + ' j\'habite à : ' + data.adress + ' je souhaite réserver ce service pour le jour :' + data.date + ' à ' + time + '&phone=212' + data.employee;
    Linking.openURL(url).then((data) => {
      console.log('WhatsApp Opened');
    }).catch(() => {
      alert('Erreur de transmission du message');
    });
  }

  return (

    <View style={styles.container1}>

      <View >
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            backgroundColor: COLORS.skyBlue,
            padding: SIZES.padding / 5,
            borderRadius: 50,
            elevation: 15,
            zIndex: 15
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
      </View>

      <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 30, marginBottom: 20 }} >
        <View>
          <Image
            style={{ width: 65, height: 65, borderRadius: 50, borderColor: '#E8F6FF', borderWidth: 3 }}
            source={{ uri: `http://192.168.1.104:8080/uploads/${route.params.employee.image}` }}
          />
        </View>
        <View
          style={{
            alignItems: "flex-start",
            marginLeft: 20
          }}
        >
          <Text style={{ ...FONTS.title, marginBottom: -5 }}>{route.params.employee.full_name}</Text>
          <AirbnbRating
            count={5}
            defaultRating={4}
            size={15}
            showRating={false}
            isDisabled
          />
          <Text style={{ ...FONTS.title, color: COLORS.skyBlue }}>{route.params.itemDetail.prix} DHs</Text>
        </View>
      </View>

      <View style={{ backgroundColor: COLORS.background, alignItems: 'center', borderRadius: 20, position: "relative" }}>
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
          <View
            style={{
              height: SIZES.height + SIZES.height * 0.4,

            }}
          >
            <Text style={{ ...FONTS.title, paddingTop: 20 }}> Please fill this form</Text>

            <View style={{ marginTop: 20 }}>
              <Input label="Full name" name="client_name" data={data} setData={setData} />
              <Input label="Phone number" name="phone" data={data} setData={setData} />

              <View>
                <Input style={styles.adresse} label="Adresse" name="adress" data={data} setData={setData} />
              </View>

              <Input label="Description" name="description" data={data} setData={setData} multiline />

              <Text style={{ ...FONTS.inputLabel, color: COLORS.gray }}>Appointment</Text>
              <View style={{ flexDirection: "row" }}>
                <View>
                  <TextInput style={styles.test} editable={false}>DATE</TextInput>
                </View>
                <View >
                  <Boutton onPress={showDatepicker} value={data.date} />
                </View>
                {show && (
                  <RNDateTimePicker
                    value={date}
                    mode={mode}
                    isVisible={data}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                  />
                )}
              </View>
              <View style={{ flexDirection: "row" }}>
                <View>
                  <TextInput style={styles.test} editable={false}>TIME</TextInput>
                </View>
                <View>
                  <Boutton onPress={showTimepicker} title="hh:ss" value={data.time} />
                </View>
              </View>
              <View style={{ alignItems: "flex-end", marginTop: 30 }}>

                <TouchableOpacity style={styles.wtsp} onPress={AddDemand}>
                  <Image style={{ marginLeft: 6, marginTop: 5, width: 20, height: 20, tintColor: "white", }}
                    source={icons.wtsp} />
                  <Text style={{ color: COLORS.white, padding: 6, fontWeight: 'bold' }}>
                    Send WhatsApp
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

        </ScrollView></View>
    </View>

  );
}

const styles = StyleSheet.create({

  container1: {
    backgroundColor: 'white',
  },

  adresse: {
    height: 35,
    width: 240,
    color: "black",
    borderColor: 'white',
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0,
    shadowRadius: 4.65,
    elevation: 6
  },

  wtsp: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 1,
    width: 160,
    backgroundColor: "#2bb55f",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0,
    shadowRadius: 4.65,
    elevation: 6
  },

  test: {
    justifyContent: 'flex-start',
    paddingLeft: 28,
    color: "#D8D8D8",
    marginTop: 4,
    height: 35,
    width: 100,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    borderColor: 'white',
    backgroundColor: "white",
    borderWidth: 1,
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

export default SendDemand;