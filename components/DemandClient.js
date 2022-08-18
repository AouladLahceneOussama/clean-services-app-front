import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ImageBackground, Image, TouchableOpacity, Linking } from 'react-native';
import icons from '../constants/icons';
import { COLORS, FONTS } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from './Button';
import axios from "axios";

function DemandClient({ item, Services, setShowModal, setSelectedItem }) {

  const [canDelete, setCanDelete] = useState(false)
  const [employee, setEmployee] = useState(null)

  const deleteIt = (id) => {
    axios.put(`http://192.168.100.7:8090/api/demands/isDeleted/${id}`).then(res => {
    }).catch(err => {
      if (err.response.data !== null)
        setErrors(err.response.data.errors)
    });
  }

  useEffect(() => {
    let date = new Date(`${item.date}`);
    let today = new Date();
    console.log(today)
    if (today.getTime() >= date.getTime() + 86400000) {
      setCanDelete(true)
    }

    axios.get('http://192.168.100.7:8090/api/employee/' + item.employee)
      .then(response => {

        setEmployee(response.data)

      })
      .catch(err => {
        console.log(err);
      })

  }, []);

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
        {canDelete &&
          <View style={{
            width: 120,
            height: 120,
            backgroundColor: "rgba(255,255,255,0.75)",
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',

          }}
          >
            <Text style={{ ...FONTS.title, color: COLORS.green }}> Done </Text>
          </View>
        }
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
                source={icons.plus}
              />
            </View>
          </TouchableOpacity>
        </View>


        {/* Date */}
        <View style={{ flex: 1, paddingLeft: 10 }}>
          <Text> date  : {item.date}</Text>
          <Text> time  : {item.time.substring(0, 5)}</Text>
          {
            employee !== null &&
            <Text> phone : {employee.phone}</Text>
          }
        </View>

        <View
          style={{
            height: 30,
            width: 130,
            alignSelf: 'flex-end',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row'
          }}
        >
          {canDelete &&
            <Button bgColor={COLORS.darkRed} text="Delete" width={60} onPress={() => { deleteIt(item.id_demand) }} />
          }
          {/* {canCancel &&
            <Button bgColor={COLORS.darkRed} text="Cansel" width={60} onPress={() => { deleteIt(item.id_demand) }} />
          } */}

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
    position: 'relative',

  },
  imageContainer: {
    width: 120,

  },
  infoContainer: {
    backgroundColor: "#fff",
    flex: 1,

  }
})

export default DemandClient;