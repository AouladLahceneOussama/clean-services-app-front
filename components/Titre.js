import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'

export default function Titre(props) {
  return <Text style={styles.header} {...props} />
}

const styles = StyleSheet.create({
  header: {
    fontSize: 21,
    // color:  ,
    fontWeight: 'bold',
    paddingVertical: 12,
  },
})