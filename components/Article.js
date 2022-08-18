import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, Switch } from 'react-native';
import { icons, COLORS } from '../constants';
import axios from 'axios';

const Article = ({ item }) => {
  const [isEnabled, setIsEnabled] = useState(item.statut == 'on' ? true : false);

  const toggleSwitch = () => {
    console.log("avant ----  " + isEnabled)
    let objectToDataBase = new FormData();
    objectToDataBase.append("statut", isEnabled == true ? "off" : "on");
    axios.put(`http://192.168.1.104:8080/api/services/update/${item.id_ser}`, objectToDataBase).then(res => {
      console.log("updated")
    })
      .catch(function (error) {
        console.log(error.message);
      })
    setIsEnabled(previousState => !previousState);

  };
  return (
    <View style={styles.containerDemand} >
      <View style={styles.containerDemandLeft} >
        <Image
          style={{ width: 100, height: 100 }}
          resizeMode="cover"
          position='absolute'
          source={{ uri: `http://192.168.1.104:8080/uploads/${item.image1}` }}
        />
      </View>
      <View style={styles.containerDemandRight} >

        <View style={{ flexDirection: 'row' }} >
          <View style={styles.containerRight1}>
            <View style={{ height: 20 }}>
              <Text >{item.service_name}</Text>
            </View>
            <View style={{ height: 33, justifyContent: 'center' }} >
              <Text style={{ color: COLORS.textGray }}>{item.description}</Text>
            </View>
            <View style={{ height: 25, justifyContent: 'center' }} >
              <Text style={{ color: COLORS.darkBlue }}>{item.prix} DH</Text>
            </View>
          </View>

          <View style={styles.containerRight2}>
            <View style={{ height: 42, justifyContent: 'center', alignItems: 'center' }}>
              <Switch
                trackColor={{ false: "#767577", true: COLORS.darkBlue }}
                thumbColor={isEnabled ? "white" : "white"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => { toggleSwitch() }}
                value={isEnabled}
                style={{ transform: [{ scaleX: .75 }, { scaleY: .5 }] }}

              />
            </View>
            <View style={{ height: 20, justifyContent: 'center' }} >
              <Text style={{ color: COLORS.textGray }}></Text>
            </View>
            <View style={{ flexDirection: "row", width: 40, marginLeft: 30 }} >
              <View  >
                <Image
                  style={{ width: 20, height: 25, tintColor: COLORS.darkBlue }}
                  resizeMode="contain"
                  source={icons.edit}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({

  containerDemandLeft: {
    backgroundColor: 'black',
    width: 100,
    height: 100,
  },
  containerDemandRight: {
    width: 240,
    height: 80,
    flexDirection: "row",
    marginTop: 10,
  },
  containerRight1: {
    width: 170,
    height: 100,
    marginLeft: 15,
    marginTop: -10,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  containerRight2: {
    width: 70,
    height: 100,
    marginTop: -10,
    flexDirection: 'column',
  },

  containerDemand: {
    marginTop: 20,
    width: 350,
    height: 100,
    flexDirection: 'row',
    backgroundColor: 'white',
  },

});
export default Article;
