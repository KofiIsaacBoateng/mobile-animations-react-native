import { Dimensions, StatusBar, StyleSheet, Image, Text, View } from 'react-native'
import React from 'react'
import NavigationElements from './NavigationElements'

const {width, height} = Dimensions.get("window")

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        height,
    },

    img: {
        width: 100,
        height: 100,
        borderRadius: 100,
        marginBottom: 10,
        marginTop: 15
    },

    contentContainer: {
        backgroundColor: "#fff",
        borderBottomRightRadius: 75,
        height: height * 0.8
    },

    content: {
        backgroundColor: "#fff",
        height: "100%",
        borderBottomRightRadius: 75
    },

    contentUnderlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "#0c0d34",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },

    footer: {
        backgroundColor: "#0c0d34",
        borderTopLeftRadius: 75,
        height: height * 0.2
    }
})

const DrawerContent = ({navigation}) => {
  return (
    <View style={styles.container}>
        <StatusBar backgroundColor={"#0c0d34"} barStyle={"light-content"} />
        {/** Navigation Elements */}
        <View style={[styles.contentContainer]}>
            <View style={styles.contentUnderlay} />
            <View style={[styles.content, {paddingVertical: 10, paddingHorizontal: 20, alignItems: "center"}]}>
                <Image 
                    source={require("../assets/avatar.jpg")}
                    style={styles.img}
                />
                <Text style={{fontSize: 18, color: "#0c0d34a7", fontWeight: "800", textAlign: "center"}}>Gesture King</Text>
                <NavigationElements navigation={navigation} />
            </View>
        </View>
        {/** Footer */}
        <View style={[styles.footer]}>
            
        </View>
    </View>
  )
}

export default DrawerContent