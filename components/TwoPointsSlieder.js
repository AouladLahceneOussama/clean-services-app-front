import MultiSlider from '@ptomasroos/react-native-multi-slider';
import React from 'react';
import { View } from 'react-native';
import { StyleSheet, Text } from 'react-native';
import { COLORS } from '../constants';

function TwoPointsSlieder({ values, min, max, prefix, postfix, onValuesChange_Price }) {
    return (
        <MultiSlider

            values={values}
            sliderLength={290}
            min={min}
            max={max}
            step={1}
            markerOffsetY={20}
            selectedStyle={{
                backgroundColor: COLORS.skyBlue,
            }}
            trackStyle={{
                height: 10,
                borderRadius: 10,
                backgroundColor: COLORS.textGray
            }}
            minMarkerOverlapDistance={50}
            customMarker={(e) => {

                return (
                    <View style={{
                        height: 80,
                        alignItems: 'center',
                        paddingTop: 13,
                    }}>

                        <View style={{
                            height: 23,
                            width: 23,
                            borderRadius: 15,
                            borderWidth: 3,
                            borderColor: '#fff',
                            backgroundColor: COLORS.darkBlue,
                            ...styles.shadow,
                        }} />
                        <Text style={{
                            top: 3,
                            color: COLORS.gray,

                        }}>
                            {prefix}{e.currentValue} {postfix}
                        </Text>

                    </View>
                )
            }}
            onValuesChange={(values) => onValuesChange_Price(values)}
        />
    );
}

const styles = StyleSheet.create({

    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 1,
        shadowOpacity: 0.9

    }
})
export default TwoPointsSlieder;