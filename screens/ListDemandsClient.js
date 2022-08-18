import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import { icons, images, FONTS, COLORS, SIZES } from '../constants';
import { DemandClient } from '../components'
import axios from "axios";
import DemandDetailsModal from './DemandDetailsModal';
import AnimatedLoader from "react-native-animated-loader";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListDemandsClient = ({ navigation }) => {

  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [ShowDemandDetailsModal, setShowDemandDetailsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [isDataNull, setIsDataNull] = useState(true);

  const [Services, setServices] = useState(
    [
      { id: "1", icon: icons.carWash, title: "Car \nwash" },
      { id: "2", icon: icons.carpet, title: "Carpet \nwash" },
      { id: "3", icon: icons.houseClean, title: "House \nclean" },
      { id: "4", icon: icons.antiBug, title: "Anti-\nbug" },
      { id: "5", icon: icons.clean, title: "Garden \nclean" }
    ]
  )


  const getData = async (key, setter) => {
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
    getData('@ClientPhone', setPhoneNumber)
  }, [])

  //get Data from DB by ids
  useEffect(() => {

    if (phoneNumber !== null) {
      console.log("LDC : phoneNumber => " + JSON.stringify(phoneNumber));

      let phone = phoneNumber.phone;

      axios.get('http://192.168.1.104:8080/api/demands/client/' + phone)
        .then(response => {

          if (response.data.length > 0) {
            // console.log("data ==> " + JSON.stringify(response.data))
            setData(response.data)
            setIsDataNull(false)

          }
          else if (response.data.length === 0) {
            setData(response.data)
          }
          else {
            setIsDataNull(true)
            setIsLoading(false)
          }
        }
        )
        .catch(err => {
          console.log(err);
        })

    }
  }, [phoneNumber])

  useEffect(() => {
    setIsLoading(false)
  }, [data])


  return (
    <View style={[styles.container, { flexDirection: "column" }]}>

      <View style={styles.containerSup} >
      </View>

      <View style={styles.containerList} >
        <View style={styles.containerLogoList}>
          <Image
            style={{ width: 200, height: 110 }}
            resizeMode="contain"
            source={require('../assets/logo_centre.png')}
          />
        </View>
        <Text style={{ ...FONTS.title, color: "black" }}> Requests list  </Text>
        <AnimatedLoader
          visible={isLoading}
          overlayColor="rgba(255,255,255,0.75)"
          source={require("../assets/loader.json")}
          animationStyle={styles.lottie}
          speed={1}
        >
        </AnimatedLoader>

        {!isLoading && !isDataNull && (

          <ScrollView>
            {
              data.map(item => (
                <TouchableOpacity key={item.id_demand} >
                  <DemandClient item={item} Services={Services} setShowModal={setShowDemandDetailsModal} setSelectedItem={setSelectedItem} />
                </TouchableOpacity>
              ))
            }
          </ScrollView>

        )}
      </View>
      {ShowDemandDetailsModal &&
        <DemandDetailsModal
          item={selectedItem}
          isVisible={ShowDemandDetailsModal}
          onClose={() => setShowDemandDetailsModal(false)}
        />}
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


export default ListDemandsClient;