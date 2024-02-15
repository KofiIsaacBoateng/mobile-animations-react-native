import { Dimensions, StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useEffect, useState, useRef }  from 'react'
import { Video, ResizeMode } from 'expo-av'
import { LinearGradient } from 'expo-linear-gradient'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'


const {width, height} = Dimensions.get("window")
const styles = StyleSheet.create({
    tik: {
        width, 
        height,
    },

    video: {
        width: "100%",
        height: "100%",
        zIndex: -1
    },

    overlay: {
        height, 
        width,
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: 0
    },

    headerIcons: {
        position: "absolute",
        top: 20,
        left: 0,
        zIndex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        width
    },
    
    backBtn: {
       
    },

    statusIndicators: {
        position: "absolute",
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
        justifyContent: "space-between",
        width,
        height: 10,
        paddingHorizontal: 5,
        zIndex: 1
    },

    indicatorBackground: {
        height: 3,
        flexGrow: 1,
        backgroundColor: "darkgray",
    },

    indicator: {
        width: "50%",
        height: "100%",
        backgroundColor: "lightgray"
    }
})

const Videos = ({user, activeUserId}) => {
    const [status, setStatus ] = useState({})
    const tikRef = useRef(null)
    const navigation = useNavigation()

    const isPlaying = status.isPlaying ? true: false

    const onPress = () => {
        if(!tikRef.current) return

        if(isPlaying){
            tikRef.current.pauseAsync()
        }else {
            tikRef.current.playAsync()
        }

    }

    useEffect(() => {
        if(!tikRef.current) return

        if(activeUserId !== user.id){
            tikRef.current.pauseAsync()
        }

        if(activeUserId === user.id) {
            tikRef.current.playAsync()
        }

    }, [activeUserId, tikRef.current])


  return (
    
    <Pressable onPress={() => onPress()} style={styles.tik}>
        <View style={styles.statusIndicators} >
            <View style={styles.indicatorBackground}>
                <View style={styles.indicator} />
            </View>
            <View style={styles.indicatorBackground}>
                <View style={styles.indicator} />
            </View>
            <View style={styles.indicatorBackground}>
                <View style={styles.indicator} />
            </View>
            <View style={styles.indicatorBackground}>
                <View style={styles.indicator} />
            </View>
        </View>
        <LinearGradient
            colors={["#00000095", "transparent", "transparent"]}
            style={styles.overlay}
        />
        <View style={styles.headerIcons}>
            <TouchableOpacity
                onPress={ () => navigation.navigate("Drawer", {screen: "TapGesture"})}
                style={styles.backBtn}
            >
                <MaterialIcons name="keyboard-arrow-left"  size={32} color="#fff9" />
            </TouchableOpacity>
            <View style={{flexDirection: "row", gap: 10, alignItems: "center"}}>
                <TouchableOpacity
                    onPress={ () => navigation.navigate("Drawer", {screen: "TapGesture"})}
                    style={[styles.backBtn, {marginLeft: "auto"}]}
                >
                    <EvilIcons name="search"  size={38} color="#fff9" />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={ () => navigation.navigate("Drawer", {screen: "TapGesture"})}
                    style={styles.backBtn}
                >
                    <MaterialCommunityIcons name="dots-vertical"  size={32} color="#fff9" />
                </TouchableOpacity>
            </View>
        </View>
        <Video
            ref = {tikRef}
            source={user.stories[0].source}
            style={styles.video}
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            onPlaybackStatusUpdate={(status) => setStatus(prev => status)}
        />
        {/** profile */}
        <View>
            {/** image */}
            {/** flex name and username */}
            {/** image */}
        </View>
    </Pressable>
  )
}

export default Videos
