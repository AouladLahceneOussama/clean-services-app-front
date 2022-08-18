import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import { icons, images, FONTS, COLORS, SIZES } from '../constants';
import { DemandEmployee } from '../components';
import axios from "axios";
import DemandDetailsModal from './DemandDetailsModal';
import AnimatedLoader from "react-native-animated-loader";
import { useAuth } from '../context/authContext';

const ListDemandsEmployee = ({ navigation }) => {

  const [data, setData] = useState({});
  const [selectedItem, setSelectedItem] = useState({});
  const [ShowDemandDetailsModal, setShowDemandDetailsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const auth = useAuth();

  const [Services, setServices] = useState(
    [
      { id: "1", icon: icons.carWash, title: "Car \nwash" },
      { id: "2", icon: icons.carpet, title: "Carpet \nwash" },
      { id: "3", icon: icons.houseClean, title: "House \nclean" },
      { id: "4", icon: icons.antiBug, title: "Anti-\nbug" },
      { id: "5", icon: icons.clean, title: "Garden \nclean" }
    ]
  )

  useEffect(() => {

    axios.get(`http://192.168.1.104:8080/api/demands/${auth.phone}`)
      .then(response => {
        if (response.data.length >= 0) {
          setData(response.data)
          setIsLoading(false)
        }
      })
      .catch(err => {
        console.log(err);
      })

  }, [])


  return (
    <View style={[styles.container, { flexDirection: "column" }]}>

      <View style={styles.containerSup} >
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

        {!isLoading && (

          <ScrollView>
            {
              data.map((item, index) => (
                <TouchableOpacity key={index} >
                  <DemandEmployee item={item} Services={Services} setShowModal={setShowDemandDetailsModal} setSelectedItem={setSelectedItem} />
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
    left: "22%",
  },
  
  containerList: {
    flex: 10,
    position: 'relative',
    backgroundColor: "#EBF6FF",
    paddingTop: 50,
    alignItems: 'center',
    borderRadius: 40,
  },
  containerSup: {
    flex: 2,
  },
});


export default ListDemandsEmployee;