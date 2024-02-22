import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

{/*** animation and gesture imports  */}
import Animated, {interpolate, withDelay, withSpring} from 'react-native-reanimated'


const {width, height} = Dimensions.get("window")
const styles = StyleSheet.create({
  
  bottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "auto",
    flexDirection: "row",
    justifyContent: "space-between"

},

bottomLeft: {
    width: width * 0.7,
    paddingLeft: 10,
    marginLeft: 5,
    backgroundColor: "transparent",
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: "flex-end",
    gap: 10
},

volumeContainer: {
    // aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center"
},

volume: {
    position: "absolute",
    backgroundColor: "#0004",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#fff6",
    width: 30, 
    height: 30,
    alignItems: "center",
    justifyContent: "center"
},


bottomRight: {
    gap: 30,
    width: width * 0.2,
    alignItems: "center"
},

profile: {
    width: 60, 
    height: 60,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "firebrick",
    zIndex: 1
},

readProfile: {
    width: 25, 
    height: 25,
    borderRadius: 50,
    backgroundColor: "firebrick",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    position: "absolute", 
    bottom: -10,
    left: 10,
}, 

reaction: {
    width: 50, 
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0009",
    borderRadius: 50
}


})


const Profile = ({muted, username, profilePhotoUrl, description, type, animatedScaleHigh, animatedScaleMute}) => {

  return (
      <View style={styles.bottom}>
          {/** username and description */}
          <View style={styles.bottomLeft}>
                <View style={{flexDirection: "row", gap: 20, alignItems: "center"}}>
                    <Text style={{color: "#ffffff", fontSize: 16, letterSpacing: 2, fontWeight: "700"}}>@ {username}</Text>
                    {type === "video" && (
                        <TouchableOpacity
                            onPress={() => muted.value = !muted.value}
                            style={styles.volumeContainer}
                        >
                            <Animated.View style={[styles.volume, animatedScaleHigh]}>
                                <SimpleLineIcons name="volume-2"  size={18} color="#fff" />
                            </Animated.View>
                            <Animated.View style={[styles.volume, animatedScaleMute]}>
                                <SimpleLineIcons name="volume-off"  size={18} color="#fff" />
                            </Animated.View>
                        </TouchableOpacity>
                    )}
                </View>
                <Text style={{color: "#ffffffd9"}}>Just some random text describing what the update is about. Could be what ...</Text>
          </View>

          {/** icons and userProfile */}
          <View style={styles.bottomRight}>
              {/** image */}
              <View style={styles.profile}>
                  <Image 
                      source={profilePhotoUrl}
                      style={{width: "100%", height: "100%", objectFit: "cover", borderRadius: 100}}
                  />
                  
                  <View style={styles.readProfile}>
                      <AntDesign name="antdesign" size={15} color="#fff" />
                  </View>
              </View>
              {/** icons */}
              <TouchableOpacity
                  onPress={ () => null}
                  style={styles.reaction}
              >
                  <FontAwesome name="hand-o-up"  size={24} color="#fff" />
              </TouchableOpacity>

              <TouchableOpacity
                  onPress={ () => null}
                  style={styles.reaction}
              >
                  <MaterialCommunityIcons name="comment-text-multiple"  size={24} color="#fff" />
              </TouchableOpacity>

              <TouchableOpacity
                  onPress={ () => null}
                  style={styles.reaction}
              >
                  <FontAwesome name="sign-in"  size={24} color="#fff" />
              </TouchableOpacity>

              <TouchableOpacity
                  style={[styles.reaction, {borderRadius: 10, backgroundColor: "#000"}]}
                  disabled={type === "video" ? false: true}
              >
                  <MaterialIcons name="multitrack-audio"  size={24} color="#fff" />
              </TouchableOpacity>
          </View>
      </View>

  )
}

export default Profile
