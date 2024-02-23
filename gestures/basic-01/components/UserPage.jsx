import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import EvilIcons from "react-native-vector-icons/EvilIcons"

{/*** animation and gesture imports */}
import Animated from 'react-native-reanimated'


const {width, height} = Dimensions.get("window")
const styles = StyleSheet.create({
    container: {
        width,
        height,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0c0d34",
        zIndex: 10,
        position: "absolute",
        top: 0,
        left: 0
    },

    text: {
        fontSize: 45,
        color: "#fff8",
        fontWeight: "bold"
    }
})
const UserPage = ({ updatePageAnimatedView}) => {
  return (
    <View style={[styles.container]}>
        <TouchableOpacity
            onPress={ () => updatePageAnimatedView(false) }
            style={styles.backBtn}
        >
            <EvilIcons name="chevron-left"  size={38} color="#fff" />
        </TouchableOpacity>
      <Text style={styles.text}>UserPage</Text>
    </View>
  )
}

export default UserPage
