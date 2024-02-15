import { StyleSheet, Image, Dimensions, View } from 'react-native'
import React from 'react'
import { FlipInEasyX } from 'react-native-reanimated'
import Profile from './Profile'

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
        opacity: 0.7
    },

    main: {
        width,
        objectFit: "contain"
    }
})

const ImageDisplay = ({source, profile}) => {
  return (
    <View style={styles.container}>
        <Image
            source={source}
            style={styles.underlay}
            blurRadius={500}
        />
        <Image 
            source={source}
            style={styles.main}
        />

        {profile}
    </View>
  )
}

export default ImageDisplay
