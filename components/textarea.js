import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'

class Input extends Component {
   render() {
      return (
        <View style={styles.textAreaContainer} >
          <TextInput
            style={styles.textArea}
            underlineColorAndroid="transparent"
            placeholderTextColor="grey"
            numberOfLines={10}
            multiline={true}
          />
        </View>
      )
   }
}
export default Input

const styles = StyleSheet.create({
  textAreaContainer: {
         marginLeft: 40,
         width: 280,
         color:"black",
         borderColor: 'white',
         backgroundColor : "white",
         borderWidth: 1,
         borderRadius: 20,
         shadowColor: "#000",
         shadowOffset: {
         	width: 0,
         	height:2,
         },
         shadowOpacity: 0,
         shadowRadius: 4.65,
         elevation:6
  },
  textArea: {
    height: 150,
    justifyContent: "flex-start"
  }
})