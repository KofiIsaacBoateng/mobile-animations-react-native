import { StyleSheet, Text, View,FlatList, Image, Dimensions } from 'react-native'
import React from 'react'
import updates from "../assets/updates"
import { TouchableOpacity } from 'react-native-gesture-handler'

const {width, height} = Dimensions.get("window")

const styles = StyleSheet.create({
  update: {
    gap: 5,
    height: "auto", 
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 100,
    overflow: "hidden",
    borderWidth: 4,
    borderColor: "limegreen"
  },

  image:{
    width: "100%",
    height: "100%",
  }
})

const TapGesture = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: "center", justifyContent: "center", paddingTop: 30, backgroundColor: "#fff"}}>
      <FlatList 
        data={updates}
        style={{height: 120, flexGrow: 0, marginTop: -100}}
        keyExtractor={(item, index) => item.id}
        horizontal={true}
        bounces={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => (
          <TouchableOpacity style={styles.update} onPress={() => navigation.navigate("Tikreels")}>
            {/*** profile */}
            <View style={styles.imageContainer}>
              <Image
                source={item.profilePhotoUrl}
                style={styles.image}
              />
            </View>
            {/** username */}
            <Text style={{fontSize: 12, fontWeight: "700", letterSpacing: 0.5, color: "#0008"}}>@{item.username}</Text>
          </TouchableOpacity>
        )}
      />
      <Text style={{fontSize: 45, color: "#0c0d3466", fontWeight: "900", marginVertical: "auto"}}>Tap Any</Text>
    </View>
  )
}

export default TapGesture