import React, { useMemo } from 'react'
import { SafeAreaView, View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { AssetsSelector } from 'expo-images-picker';
import { COLORS, SIZES, FONTS } from '../constants';

const ImagePicker = ({ navigation }) => {
   
    const widgetSettings = useMemo(
        () => ({
            getImageMetaData: false,
            initialLoad: 100,
            assetsType: ["photo", "video"],
            minSelection: 1,
            maxSelection: 5,
            portraitCols: 4,
            landscapeCols: 4,
        }),
        []
    )

    const widgetErrors = useMemo(
        () => ({
            errorTextColor: 'black',
            errorMessages: {
                hasErrorWithPermissions: 'Please Allow media gallery permissions.',
                hasErrorWithLoading: 'There was an error while loading images.',
                hasErrorWithResizing: 'There was an error while loading images.',
                hasNoAssets: 'No images found.',
            },
        }),
        []
    );

    const widgetStyles = useMemo(
        () => ({
            margin: 2,
            bgColor: 'white',
            spinnerColor: COLORS.skyBlue,
            widgetWidth: 100,
            videoIcon: {
                Component: Ionicons,
                iconName: 'ios-videocam',
                color: COLORS.darkBlue,
                size: 20,
            },
            selectedIcon: {
                Component: Ionicons,
                iconName: 'ios-checkmark-circle',
                color: 'white',
                bg: COLORS.skyBlue1,
                size: 26,
            },
        }),
        []
    );

    const _textStyle = {
        color: 'white',
    };

    const _buttonStyle = {
        backgroundColor: COLORS.skyBlue,
        borderRadius: 5,
    }

    const onSuccess = (data) => {
        navigation.navigate("AddService", { data })
    };

    const widgetNavigator = useMemo(
        () => ({
            Texts: {
                finish: 'Done',
                back: 'back',
                selected: 'selected',
            },
            midTextColor: 'black',
            minSelection: 1,
            buttonTextStyle: _textStyle,
            buttonStyle: _buttonStyle,
            onBack: () => { navigation.goBack() },
            onSuccess: (e) => onSuccess(e),
        }),
        []
    );

    // const CustomNavigator = ({ doneFunction }) => (
    //     <View
    //         style={{
    //             flexDirection: 'row',
    //             justifyContent: "space-between",
    //             marginHorizontal: 5,
    //             marginVertical: 10
    //         }}
    //     >
    //         <TouchableOpacity
    //             style={{
    //                 backgroundColor: COLORS.skyBlue,
    //                 paddingHorizontal: SIZES.padding,
    //                 paddingVertical: SIZES.padding / 3,
    //                 borderRadius: 5
    //             }}

    //             onPress={() => navigation.goBack()}
    //         >
    //             <Image
    //                 source={icons.backArrow}
    //                 resizeMode="contain"
    //                 style={{
    //                     width: 15,
    //                     height: 15,
    //                     tintColor: COLORS.background
    //                 }}
    //             />
    //         </TouchableOpacity>

    //         <TouchableOpacity
    //             style={{
    //                 backgroundColor: COLORS.skyBlue,
    //                 paddingHorizontal: SIZES.padding * 2,
    //                 paddingVertical: SIZES.padding / 3,
    //                 borderRadius: 5,
    //             }}

    //             onPress={doneFunction(prepareResponse())}
    //         >
    //             <Text style={{ color: COLORS.white }} >
    //                 Done
    //             </Text>
    //         </TouchableOpacity>
    //     </View>
    // )

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <AssetsSelector
                Settings={widgetSettings}
                Errors={widgetErrors}
                Styles={widgetStyles}
                Navigator={widgetNavigator}
                // CustomNavigator={{
                //     Component: CustomNavigator,
                //     props: {
                //         doneFunction: (data) => onSuccess(data),
                //     },
                // }}
            />
        </SafeAreaView>
    )
}

export default ImagePicker