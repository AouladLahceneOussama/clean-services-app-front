import * as Font from 'expo-font';

async function useFonts(){
    await Font.loadAsync({
        PoppinsLight: require('../assets/fonts/Poppins-Light.ttf'),
        PoppinsBold: require('../assets/fonts/Poppins-SemiBold.ttf'),
        Poppins: require('../assets/fonts/Poppins-Regular.ttf'),
    });
}


export default useFonts;