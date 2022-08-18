import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

const Boutton = ({value,onPress}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.buttonBody}
        >
            <Text style={styles.buttonText}>
                {value}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonBody: {
        height: 35,
        width: 205,
        marginTop: 4,
        marginLeft: 2,
        color: "black",
        borderColor: 'white',
        backgroundColor: "white",
        borderWidth: 1,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0,
        shadowRadius: 4.65,
        elevation: 6
    },
    buttonText: {
        justifyContent: 'flex-start',
        paddingLeft: 28,
        color: "#D8D8D8",
        marginTop: 4,
        fontSize: 16,
        fontWeight: '600',
    }
});

export default Boutton;


