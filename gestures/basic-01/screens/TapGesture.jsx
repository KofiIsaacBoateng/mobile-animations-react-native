import { StyleSheet, Text, View,FlatList, Image, Dimensions } from 'react-native'
import React, { useState } from 'react'
import updates from "../assets/updates"
import TikReels from './TikReels'


{/*** animation and gesture imports */}
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming, interpolate } from 'react-native-reanimated'
import { Directions, Gesture, GestureDetector, TouchableOpacity } from 'react-native-gesture-handler'

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
  },

  tikreels: {
    position: "absolute",
    top: 0,
    left: 0
  }
})

const TapGesture = ({navigation}) => {
  const [clickedIndex, setClickedIndex] = useState(undefined)
  const storiesInView = useSharedValue(false)

  const updateStoriesState = (index) => {
    setClickedIndex(prev => index)
    storiesInView.value = !storiesInView.value
  }


  const storiesPopUpAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {scale: withTiming(interpolate(
            storiesInView.value,
            [false, true],
            [0.7, 1]
          ), {duration: 300})
        },

        {translateY: withDelay(200, withTiming(interpolate(
          storiesInView.value,
          [false, true],
          [height, 0]
        ), {duration: 200})) }
      ],

      width: withDelay(300, withTiming(interpolate(
        storiesInView.value,
        [false, true],
        ["0%", "100%"]
      ), {duration: 100})),

      height: withDelay(300, withTiming(interpolate(
        storiesInView.value,
        [false, true],
        ["0%", "100%"]
      ), {duration: 100})),

      display: withDelay(300, withTiming(interpolate(
        storiesInView.value,
        [false, true],
        ["none", "flex"]
      )))
    }
  })

  const flingDown = Gesture.Fling().direction(Directions.DOWN)
    .onStart((_e) => {
      storiesInView.value = false
      console.log("flung down")
    })

  return (
    <>
      <View style={{flex: 1, alignItems: "center", justifyContent: "center", paddingTop: 30, backgroundColor: "#fff"}}>
        <FlatList 
          data={updates}
          style={{height: 120, flexGrow: 0, marginTop: -100}}
          keyExtractor={(item, index) => item.id}
          horizontal={true}
          bounces={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <TouchableOpacity style={styles.update} onPress={() => updateStoriesState(index)}>
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
      <GestureDetector gesture={flingDown}>
        <Animated.View style={[styles.tikreels, storiesPopUpAnimatedStyle]}>
          <TikReels 
            updateStoriesState={updateStoriesState} 
            clickedIndex={clickedIndex} 
          />
        </Animated.View>
      </GestureDetector>

    </>
  )
}

export default TapGesture