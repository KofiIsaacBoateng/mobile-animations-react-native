import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { TouchableOpacity } from 'react-native-gesture-handler'

const {width} = Dimensions.get("window")
const styles = StyleSheet.create({
    navItem: {
        flexDirection: "row", 
        alignItems: "center",
        gap: 15
    }
})

const NavElement = ({icon, label, iconBackground, onPress}) => {
    return (
        <TouchableOpacity 
            style={styles.navItem}
            {...{onPress}}
        >
            {/** icon */}
            <View style={{width: 40, height: 40, alignItems: "center", justifyContent: "center", borderRadius: 50, backgroundColor: iconBackground }}>
                {icon}
            </View>
            {/** label */}
            <Text style={{fontSize: 15, fontWeight: "700", color: "#555"}}>{label}</Text>
        </TouchableOpacity>
    )
}

const NavigationElements = ({navigation}) => {
  return (
    <View style={{flex: 1, gap: 25, marginTop: 40, width: "100%", paddingHorizontal: 15}}>
      <NavElement 
        label={"PanGesture"}
        icon={<MaterialCommunityIcons name="drag-variant" color="#fff" size={24} />}
        iconBackground={"#cc1800e7"}
        onPress={() => navigation.navigate("PanGesture")}
      />

      <NavElement 
        label={"TapGesture"}
        icon={<MaterialCommunityIcons name="gesture-double-tap" color="#fff" size={24} />}
        iconBackground={"#47cc00e7"}
        onPress={() => navigation.navigate("TapGesture")}
      />

      <NavElement 
        label={"PanTap"}
        icon={<MaterialIcons name="tap-and-play" color="#fff" size={24} />}
        iconBackground={"skyblue"}
        onPress={() => navigation.navigate("PanTap")}
      />

      <NavElement 
        label={"Status"}
        icon={<MaterialIcons name="tap-and-play" color="#fff" size={24} />}
        iconBackground={"purple"}
        onPress={() => navigation.navigate("PanTap")}
      />

      <NavElement 
        label={"Scroll Gestures"}
        icon={<MaterialIcons name="tap-and-play" color="#fff" size={24} />}
        iconBackground={"#0c0d34"}
        onPress={() => navigation.navigate("PanTap")}
      />

    </View>
  )
}

export default NavigationElements

