import { StyleSheet, Image, Dimensions, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'


// animation and gesture imports
import { GestureDetector, Gesture } from 'react-native-gesture-handler'
import { runOnJS } from 'react-native-reanimated'



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

const ImageDisplay = ({source, profile, next, back}) => {
        // single tap gesture to update current story
    const singleTap = Gesture.Tap()
        .onEnd((_e, success) => {
            // console.log("single tapped")
            if(success) {
                if (_e.x > width / 2){
                    runOnJS(next)()
                }else {
                    runOnJS(back)()
                }
            }
    })

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
        <GestureDetector gesture={singleTap}>
            <LinearGradient
                colors={["#000000aa", "transparent", "transparent", "transparent", "#000000c2"]}
                style={styles.overlay}
            />
        </GestureDetector>
    </View>
  )
}

export default ImageDisplay
