import { StyleSheet, Image, Dimensions, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'


const {width, height} = Dimensions.get("window")
const styles = StyleSheet.create({
    container: {
        width,
        height,
        justifyContent: "center",
        zIndex: -1
    },

    underlay: {
        width,
        height,
        position: "absolute",
        opacity: 0.7,
        zIndex: -1
    },

    main: {
        width,
        objectFit: "contain",
        zIndex: 0
    },

    overlay: {
        height, 
        width,
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: 1
    },

    bottom: {
        position: "absolute",
        bottom: 20,
        left: 0,
        right: 0,
        height: "auto",
        flexDirection: "row",
        justifyContent: "space-between",
        zIndex: 2
    }
})

const ImageDisplay = ({source, profile}) => {
  return (
    <View style={styles.container}>
        <Image
            source={source}
            style={styles.underlay}
            blurRadius={100}
        />
        <Image 
            source={source}
            style={styles.main}
        />
        <View style={styles.bottom}>
            {profile}
        </View>

        {/** gradient overlay  */}
        <LinearGradient
            colors={["#000000aa", "transparent", "transparent", "transparent", "#000000c2"]}
            style={styles.overlay}
        />
    </View>
  )
}

export default ImageDisplay
