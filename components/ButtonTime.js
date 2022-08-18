import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../constants';

const ButtonTime = ({ onPress, text, bgColor,colors,Fonts }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{ ...styles.buttonBody, backgroundColor: bgColor }}
        >
            <Text style={{ ...FONTS.smallTitle, color: colors,fontSize:Fonts }}>
                {text}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonBody: {
        paddingVertical: 2,
        paddingHorizontal: 10,
        marginHorizontal:3,
        borderRadius: 200,
    },
});

export default ButtonTime;