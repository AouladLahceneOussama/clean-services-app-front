import React, { useEffect, useState } from 'react';
import { TouchableOpacity, SafeAreaView, StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { icons, COLORS, FONTS, SIZES } from '../constants';
import { ServiceOffer, Service } from '../components';
import { LinearGradient } from 'expo-linear-gradient';
import axios from "axios";
import FilterModal from './filterModal';


function Home({ navigation }) {

  const [ServiceOffers, setServiceOffers] = useState([])
  const [test, setTest] = useState([])

  const Services = [
    { id: "1", icon: icons.carWash, title: "Car \nwash" },
    { id: "2", icon: icons.carpet, title: "Carpet \nwash" },
    { id: "3", icon: icons.houseClean, title: "House \nclean" },
    { id: "4", icon: icons.antiBug, title: "Anti-\nbug" },
    { id: "5", icon: icons.clean, title: "Garden \nclean" }
  ]

  const [filter, setFilter] = useState({
    "service": "1",
    "City": "",
    "price": [60, 150]
  })

  const [selectedCat, setSelectedCat] = useState(filter.service);
  const [ShowFilterModal, setShowFilterModal] = useState(false);

  useEffect(() => {
    setSelectedCat(filter.service)
    setTest(ServiceOffers.filter(ServiceOffer => ServiceOffer.service_parent === filter.service && ServiceOffer.prix <= filter.price[1] && ServiceOffer.prix >= filter.price[0] && ServiceOffer.statut === "on"))
  }, [filter])


  useEffect(() => {
    console.log("iam working")
    axios.get('http://192.168.1.104:8080/api/services')
      .then(response => {
        if (response.data.length >= 0) {
          setServiceOffers(response.data)
        }
      }).catch(err => {
        console.log(err);
      })
  }, [])

  useEffect(() => {
    setTest(ServiceOffers.filter(ServiceOffer => ServiceOffer.service_parent === selectedCat && ServiceOffer.statut === "on"))
  }, [selectedCat])

  const changeOpacity = (id) => {
    setSelectedCat(id);
    setTest(ServiceOffers.filter(ServiceOffer => ServiceOffer.service_parent === id && ServiceOffer.statut === "on"))
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ backgroundColor: "#fff", height: 120, justifyContent: 'center' }}>
        <Image
          resizeMode="contain"
          style={{
            alignSelf: 'center',
            tintColor: COLORS.darkBlue,
            height: 60,
          }} source={icons.cleanAppLogo} />

        <TouchableOpacity style={{
          backgroundColor: COLORS.darkBlue,
          alignSelf: 'flex-start',
          marginLeft: 15,
          width: 70,
          justifyContent: 'center',
          borderRadius: 50,
          paddingVertical: 10,
          alignItems: 'center'

        }} onPress={() => setShowFilterModal(true)}>
          <Image
            source={icons.filter}
            resizeMode="contain"
            style={{
              width: 20,
              height: 20,
              tintColor: "white",
            }}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          backgroundColor: COLORS.background,
          paddingTop: 10,
          paddingBottom: 40,
          paddingHorizontal: SIZES.padding / 3
        }}
      >
        <View style={{ marginTop: 10 }}>
          <Text style={{ marginLeft: 10, fontSize: 25, fontWeight: 'bold' }}>Services</Text>
        </View>

        {/* ___________________________________________services_____________________________________ */}
        <ScrollView
          style={{ height: 100 }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {
            Services.map(service => (
              <TouchableOpacity key={service.id} onPress={() => { changeOpacity(service.id) }}>
                <Service selectedCat={selectedCat} key={service.id} service={service} />
              </TouchableOpacity>
            ))
          }
        </ScrollView>

        {/* ___________________________________________offers________________________________________ */}

        <View style={{ position: 'relative', marginVertical: 10 }}>
          <Text
            style={{ marginLeft: 10, fontSize: 25, fontWeight: 'bold' }}>Service offers</Text>
          <LinearGradient
            colors={['rgba(235, 246, 255,.8)', 'rgba(235, 246, 255,0)']}
            style={{

              position: 'absolute',
              zIndex: 100,
              marginTop: 42,
              width: "100%",
              height: 40,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50
            }}
          >
          </LinearGradient>
        </View>

        <ScrollView >
          <View style={{ height: 900 }}>
            {
              test.map(item => (
                <ServiceOffer key={item.id_ser} item={item} services={Services} navigation={navigation} />
              ))
            }
          </View>
        </ScrollView>
      </View>

      {/* Fliter section  */}
      {ShowFilterModal &&
        <FilterModal
          isVisible={ShowFilterModal}
          onClose={() => setShowFilterModal(false)}
          filter={filter}
          setFilter={setFilter}
        />
      }

    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});

export default Home;