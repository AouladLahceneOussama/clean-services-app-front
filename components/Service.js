import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import COLORS from '../constants/theme';

function Service({ selectedCat, service }) {

    return (

        <View style={{
            opacity: selectedCat === service.id ? 1 : 0.5,
            marginTop: 10,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0,
            shadowRadius: 4.65,
            elevation: 6,
            flexDirection: 'row',
            backgroundColor: "#fff",
            width: 125,
            height: 60,
            borderRadius: 50,
            marginHorizontal: 5,
        }}>
            <Image
                source={service.icon}
                resizeMode="contain"
                style={{
                    alignSelf: 'center',
                    marginLeft: 10,
                    flex: 1,
                    width: 32,
                    height: 32,
                    tintColor: '#000'
                }}
            />
            <Text
                style={{
                    marginRight: 20,
                    textAlign: 'center',
                    fontSize: 14,
                    fontWeight: 'bold',
                    flex: 1,
                    flexWrap: 'wrap',
                    alignSelf: 'center'
                }}
            >
                {service.title}
            </Text>
        </View>
    );
}

export default Service;