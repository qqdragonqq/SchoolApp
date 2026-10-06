import { StyleSheet } from "react-native";

const taskBoxSize=175

export const globalStyle = StyleSheet.create({
    Background: {
        backgroundColor: "#00014d",
        flex: 1,
        alignItems:"center"
    },
    TaskBox: {
        backgroundColor: "#ffff",
        padding: 10,
        borderRadius: 20,
        width: taskBoxSize*2,
        height: taskBoxSize
    },
    AddButton: {
        borderRadius: 100,
        width: 75,
        height: 75,
        backgroundColor: "#238029",
        alignSelf: "flex-end",
        marginTop: "auto",
        margin: 25,
        marginBottom: 75
    },
    AddbuttonText: {
        fontSize: 50,
        alignSelf: "center",
        color: "#40fcffd2"
    },
    overlayDarkBg: {
        backgroundColor:"#ffffff50",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    overlay: {
        backgroundColor: "#ffff"
    }
})