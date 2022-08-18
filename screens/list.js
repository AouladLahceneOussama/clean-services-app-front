import React, { useState, createRef } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { icons, COLORS, FONTS, SIZES } from '../constants';
import axios from 'axios';
import { useAuth } from '../context/authContext';
const testIDs = require('../testIDs');

function List() {

    const [selected, setSelected] = useState();
    const [items, setItems] = useState([]);
    const bs = createRef();
    const fall = new Animated.Value(1);
    const auth = useAuth();

    const onDayPress = day => {

        setSelected(day.dateString);
        axios.get(`http://192.168.1.104:8080/api/demands/${auth.phone}/${day.dateString}`).then((response) => {
            console.log(response.data.length)
            setItems(response.data)
        }).catch(err => {
            console.log("err => " + err);
        })
        bs.current.snapTo(0);

    };

    const renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.panelHeader}>
                <View style={styles.panelHandle} />
            </View>
        </View>
    );

    const renderEmpty = () => (
        <View style={{
            backgroundColor: "white",
            height: 700,
            padding: 10,
            elevation: 6,
        }} >
            <Text style={{ ...FONTS.title }}>Tasks of {selected}</Text>
            <Text>
                Nothing to do this day.
            </Text>
        </View>
    )

    const renderEmptyActivity = () => (

        <View
            style={{ backgroundColor: "white", height: 700, padding: 10, elevation: 6, }}>
            <Text style={{ ...FONTS.title }}>Tasks of {selected}</Text>
            {items.map((item) => (
                <View key={item.id_demand} style={{ backgroundColor: COLORS.lightGray, marginBottom: 5, padding: 10, }}>
                    <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start" }} >
                        <View style={{ backgroundColor: COLORS.skyBlue, paddingVertical: 2, width: 90, alignItems: "center", borderRadius: 5, marginRight: 10 }} >
                            <Text style={{ ...FONTS.title, color: "white" }}>
                                Time
                            </Text>
                            <Text style={{ ...FONTS.title, color: "white" }}>
                                {item.time}
                            </Text>
                        </View>
                        <View>
                            <Text style={{ ...FONTS.title, color: "black", marginBottom: -5 }}>
                                {item.client_name}
                            </Text>
                            <Text style={{ color: COLORS.textGray }}><Image style={{ width: 12, height: 12, tintColor: COLORS.skyBlue }} source={icons.phone}
                            />  {item.phone}
                            </Text>
                            <Text style={{ color: COLORS.textGray }}><Image style={{ width: 12, height: 12, tintColor: COLORS.skyBlue }} source={icons.home}
                            />  {item.adress}
                            </Text>
                        </View>
                    </View>
                </View>
            ))}
        </View>
    )

    return (
        <ScrollView>
            <View>
                <Calendar
                    testID={testIDs.calendars.CONTAINER}
                    current={new Date().toString()}
                    minDate={new Date().toString()}
                    maxDate="2022-12-31"
                    markingType={'multi-dot'}
                    style={styles.calendar}
                    onDayPress={onDayPress}
                    markedDates={{
                        [selected]: {
                            selected: true,
                            selectedColor: COLORS.skyBlue,
                            selectedTextColor: 'white',
                            dots: [{ key: 'notEmptyActivity', color: 'blue', selectedDotColor: 'white' }]
                        },
                    }}
                    disableMonthChange={true}
                    hideArrows={true}
                    hideExtraDays={true}
                    theme={{
                        calendarBackground: COLORS.background
                    }}
                />
                <BottomSheet
                    ref={bs}
                    snapPoints={[300, 0]}
                    initialSnap={1}
                    callbackNode={fall}
                    enabledGestureInteraction={true}
                    // renderContent={renderEmptyActivity}
                    renderContent={Object.keys(items).length > 0 ? renderEmptyActivity : renderEmpty}
                    renderHeader={renderHeader}
                />
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -12 },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        elevation: 0,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,

    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {

        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    calendar: {
        marginBottom: 20
    },

});

export default List;