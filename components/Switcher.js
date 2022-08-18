import React,{useState} from 'react';
import { Switch} from 'react-native';
import { icons, images, FONTS, COLORS, SIZES } from '../constants';

const Switcher = () => {
const [isEnabled, setIsEnabled] = useState(false);
const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return (

        <Switch
                trackColor={{ false: "#767577", true: COLORS.darkBlue }}
                thumbColor={isEnabled ? "white" : "white"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
                style={{ transform: [{ scaleX: .75 }, { scaleY: .5 }] }}

              />
    )
}
export default Switcher ;
