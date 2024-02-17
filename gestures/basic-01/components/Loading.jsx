import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const {width, height} = Dimensions.get("window")
const Loading = () => {
  return (
    <View style={styles.loading}>
      <Text style={{fontSize: 45, color: "#fff", fontWeight: "bold"}}>Loading...</Text>
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
    loading: {
        position: "absolute",
        top: 0,
        left: 0,
        width,
        height,
        alignItems:"center",
        justifyContent: "center",
        zIndex: 3,
        backgroundColor: "#00000079"
    },

    el: {

    }
})