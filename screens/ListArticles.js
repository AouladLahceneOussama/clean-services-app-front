import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, ScrollView,TouchableOpacity } from 'react-native';
import { icons,COLORS,SIZES } from '../constants';
import { Article } from '../components';
import axios from 'axios';
import { useAuth } from '../context/authContext';

const ListArticles = ({navigation}) => {
  const [data, setData] = useState([]);
  const [datauser, setDatauser] = useState({});
  const auth = useAuth();

  useEffect(() => {
    axios.get(`http://192.168.1.104:8080/api/services/${auth.phone}`)
      .then(response => {
        setData(response.data)
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  useEffect(() => {
    axios.get(`http://192.168.1.104:8080/api/employees/${auth.phone}`)
      .then(response => {
        setDatauser(response.data)
        console.log(datauser.image)
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  return (
    <View id={datauser.phone} style={[styles.container, { flexDirection: "column" }]}>

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
            source={require('../assets/logo_centre1.png')}
          />
        </View>
        <Text style={styles.containerTitre}>List Of Your Services</Text>
        <Text style={{ color: COLORS.textGray }}>You can activate or desactivate the article by {"\n"}using the switch </Text>

        <ScrollView>
          {data.map((val, key) => {
            return (
              <Article key={val.id_ser} item={val} />
            );
          })}
        </ScrollView>

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
  containerProfile: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: "1%",

  },
  containerMenu: {
    width: "3%",
    height: 30,
    marginTop: "10%",
    marginLeft: "2%",

  },
  containerLogo1: {
    width: "4%",
    height: 30,
    marginTop: "10%",
  },
  containerLogo: {
    width: "88%",
    height: 50,
    marginTop: "20%",
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "row",
  },
  containerLogoList: {
    alignItems: 'center',
    position: 'absolute',
    top: -55,
    left: "23%",
  },
  containerList: {
    flex: 4,
    position: 'relative',
    backgroundColor: "#EBF6FF",
    paddingTop: 50,
    alignItems: 'center',
    borderRadius: 40,
  },
  containerSup: {
    flex: 1,
    zIndex: 2,
    elevation: 2,
  },
});

export default ListArticles;