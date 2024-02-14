import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import Card from '../components/Card'
import { interpolate, useSharedValue, withSpring } from 'react-native-reanimated'
import { Directions, Gesture, GestureDetector } from 'react-native-gesture-handler'

const cards = [
  // {
  //   id: 1, 
  //   name: "card 6",
  //   index: 5,
  //   background: "#47cc00"
  // },  
  // {
  //   id: 2, 
  //   name: "card 5",
  //   index: 4,
  //   background: "skyblue"
  // },  
  {
    id: 3, 
    name: "card 4",
    index: 3,
    background: "#47cc00"
  },

  {
    id: 4, 
    name: "card 3",
    index: 2,
    background: "#cc1800"
  },

  {
    id: 5, 
    name: "card 2",
    index: 1,
    background: "purple"
  },

  {
    id: 6,
    name: "card 1",
    index: 0,
    background: "#0c0d34"
  }
]

const PanGesture = () => {
  const activeState = useSharedValue(0)

  const flingLeftGesture = Gesture.Fling().direction(Directions.LEFT)
      .onStart(() => {
        if(activeState.value <= 0) return
        activeState.value = withSpring(activeState.value - 1)
        console.log(`Flung left: ${Math.floor(activeState.value)}`)
      })

  const flingRightGesture = Gesture.Fling().direction(Directions.RIGHT)
      .onStart(() => {
        if (activeState.value >= cards.length - 1) return
        activeState.value = withSpring(activeState.value + 1)
        console.log(`Flung right: ${Math.floor(activeState.value)}`)
      })

 
  const horizontalGestures = Gesture.Exclusive(flingLeftGesture, flingRightGesture)

  return (
    <GestureDetector gesture={horizontalGestures}>
      <View  style={{flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#fff"}}>
          {cards.map((card, _i) => (
            <Card
              key={_i}
              index={_i}
              position={card.index}
              name={card.name}
              backgroundColor={card.background}
              activeState={activeState}
              horizontalGestures={horizontalGestures}
            />
          ))}
      </View>
    </GestureDetector>
  )
}

export default PanGesture

const styles = StyleSheet.create({})