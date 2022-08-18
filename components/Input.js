import React, { useState } from 'react'
import { View, TextInput, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import { FONTS, COLORS, icons, SIZES } from '../constants';

function Input({ label, password = false, icon = "", name, data, setData, multiline = false }) {

   const [showPass, setShowPass] = useState(password);
   const [borderColor, setBorderColor] = useState("white");
   const [borderWidth, setBorderWidth] = useState(0);

   const updateValue = (event) => {
      setData({
          ...data,
          [name]: event.nativeEvent.text
         
      });
  }
   function displayIcon() {
      if (password)
         return showPass ? icon : icons.eyeSlash
      return icon
   }

   function inputFocus() {
      setBorderColor(COLORS.skyBlue);
      setBorderWidth(1)
   }

   function inputBlur() {
      setBorderColor(COLORS.white);
      setBorderWidth(0)
   }

   return (
      <View style={{ position: "relative" }}>
         <Text style={{ ...FONTS.inputLabel, color: COLORS.gray }}>{label}</Text>

         <TextInput
            style={{
               ...styles.input,
               borderColor: borderColor,
               borderWidth: borderWidth,
               height: multiline ? 120 : 30,
               textAlignVertical:'top',
               borderRadius: multiline ? 10 : 25,
            }}
            underlineColorAndroid="transparent"
            placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            secureTextEntry={showPass ? true : false}
            selectionColor={COLORS.skyBlue}
            name={name}
            onChange={updateValue}
            value={data[name]}
            onFocus={() => inputFocus()}
            onBlur={() => inputBlur()}
            multiline={multiline}
            maxLength={255}
         />

         {icon !== "" ? (
            <TouchableOpacity
               style={{
                  position: 'absolute',
                  top: 25,
                  right: -10,
                  zIndex: 100,
                  elevation: 100,
                  paddingHorizontal: 20
               }}

               onPress={() => { password ? setShowPass(!showPass) : "" }}
            >
               <Image
                  source={displayIcon()}
                  resizeMode="contain"
                  style={{
                     width: 20,
                     height: 20,
                     tintColor: COLORS.skyBlue,
                  }}
               />
            </TouchableOpacity>
         ) : (<Text style={{ height: 0 }}> </Text>)
         }

      </View>
   )
}


const styles = StyleSheet.create({

   input: {
      paddingTop:5,
      paddingHorizontal: 10,
      marginBottom: SIZES.margin,
      width: SIZES.width - SIZES.margin*5,
      color: "black",
      backgroundColor: "white",

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

export default Input