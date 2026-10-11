import { StyleSheet } from "react-native";


const overlayInput=275


export const globalStyle = StyleSheet.create({
    Background: {
        backgroundColor: "#6365da",
        flex: 1,
        alignItems:"center"
    },
    TaskBox: {
        backgroundColor: "#ebebeb",
        padding: 10,
        borderRadius: 20,
        width: 340,
        height: 125,
        margin: 10
    },
    TaskBoxTitle: {
        fontWeight: "bold",
        fontSize: 30
    },
    TaskBoxDetails: {
        marginTop: 10
    },
    AddButton: {
        borderRadius: 100,
        width: 75,
        height: 75,
        backgroundColor: "#f7c664",
        alignSelf: "flex-end",
        marginTop: "auto",
        margin: 25,
        marginBottom: 75
    },
    AddbuttonText: {
        fontSize: 50,
        alignSelf: "center",
        color: "#8b2f0ad2"
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
        padding: 15,
        alignItems: "center"
    },
    overlayTitleInput: {
        width: overlayInput,
        fontSize: 35,
        backgroundColor: "#ffff",
        overflowY: "scroll"
    },
    overlayDetailInput: {
        margin: 5,
        width: overlayInput,
        fontSize: 20,
        backgroundColor: "#ffff",
        overflowY: "scroll"
    },
    xBtn: {
        alignSelf: "flex-end",
        marginBottom: 15,
        width: 35,
        height: 35,
        alignItems: "center",
        justifyContent: "center"
    },
    xText: {
        fontSize: 25,
        color: "#ff0000"
    }
})