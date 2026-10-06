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
        backgroundColor: "#38c442",
        alignSelf: "flex-end",
        marginTop: "auto",
        margin: 25,
        marginBottom: 75
    },
    AddbuttonText: {
        fontSize: 50,
        alignSelf: "center",
        color: "#334546d2"
    },
    overlayDarkBg: {
        backgroundColor:"#1c1c1ca0",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    overlay: {
        backgroundColor: "#bdbdbd",
        width: 300,
        padding: 15
    },
    overlayInput: {
        width: "auto",
        fontSize: 20,
        backgroundColor: "#ffff",
        overflowY: "scroll"
    },
    xBtn: {
        alignSelf: "flex-end",
        marginBottom: 15
    },
    xText: {
        fontSize: 25,
        color: "#ff0000"
    }
})