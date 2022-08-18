import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants';

const Button = ({ onPress, text, bgColor , paddingVertical, width }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{ ...styles.buttonBody, backgroundColor: bgColor ,paddingVertical: paddingVertical,width: width}}
        >
            <Text style={{ ...FONTS.smallTitle, color: COLORS.white }}>
                {text}
            </Text>
        </TouchableOpacity>
    )

}
const styles = StyleSheet.create({
    buttonBody: {
        paddingHorizontal: 20,
        marginHorizontal:3,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 200,   
    },
});
export default Button;