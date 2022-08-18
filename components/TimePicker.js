import React, { useState } from 'react';
import { View } from 'react-native';
import { COLORS } from '../constants';
import DateTimePicker from "react-native-modal-datetime-picker";
import ButtonTime from './ButtonTime';

const TimePicker = ({ texts, setData, data, index = -1 }) => {

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    if (index >= 0) {
      const newData = [...data];
      newData[index][texts] = date.getHours() + ":" + date.getMinutes() + ":00";
      setData(newData);
    }
    hideDatePicker();
  };

  return (

    <View style={{ justifyContent: 'center', marginLeft: 20 }}>
      <ButtonTime onPress={showDatePicker} text={data[index][texts] != null ? data[index][texts] : "00:00:00"} bgColor={COLORS.white} colors={COLORS.gray} Fonts={12} />
      <DateTimePicker
        isVisible={isDatePickerVisible}
        mode="time"
        headerTextIOS="Pick a Time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        themeVariant="light"
      />
    </View>
  )
}
export default TimePicker;
