import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
    background: "#EBF6FF",
    red: "#F28F8F",
    darkRed: "#F22020",

    green: "#1BC126",
    gray: "#828080",
    lightGray:"#eaeaea",
    white: "#ffffff",

    skyBlue: "#86CBF8",
    skyBlue1: "#86CBF84c",
    darkBlue: "#0099FF",

    yellow: "#FFEF10",

    textBlue: "#0099FF",
    textGray: "#B8B8B8"
};

export const SIZES = {
    bigTitle:35,
    title:18,
    smallTitle:12,
    label:12,
    desc1: 15,
    desc2: 12,
    desc3:8,

    padding:25,
    margin:10,
    radius:16,

    width,
    height
};

export const FONTS = {
    bigTitle: { fontFamily:"PoppinsBold", fontSize:SIZES.bigTitle },
    title: { fontFamily:"PoppinsBold", fontSize:SIZES.title },
    smallTitle: { fontFamily:"PoppinsBold", fontSize:SIZES.smallTitle },
    inputLabel:{ fontFamily:"Poppins", fontSize:SIZES.label },
    desc1:{ fontFamily:"PoppinsLight", fontSize:SIZES.desc1 ,lineHeight:15, color:COLORS.gray },
    desc2:{ fontFamily:"Poppins", fontSize:SIZES.desc2, lineHeight:15, color:COLORS.gray },
    desc3:{ fontFamily:"PoppinsLight", fontSize:SIZES.desc3, lineHeight:13, color:COLORS.gray },
};

const appTheme = { COLORS,SIZES,FONTS };

export default appTheme;