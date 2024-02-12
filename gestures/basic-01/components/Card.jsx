import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import { GestureDetector, Gesture } from 'react-native-gesture-handler'
import Animated, { useSharedValue, withSpring, useAnimatedStyle } from 'react-native-reanimated'
import {mix, mixColor} from "react-native-redash"


const {width, height} = Dimensions.get("window")
const styles = StyleSheet.create({
    card: {
        width: width * 0.75,
        height: height * 0.6,
        position: "absolute",
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    }
})

const Card  = ({position, name, index, backgroundColor, cards, setCards}) => {
    const offset = useSharedValue({x: 0, y: 0})
    const start = useSharedValue({x: 0, y: 0})
    const scale = mix(position, 1, 0.94)
    const translateY = mix(position, 0, -10)

    const gesture = useMemo(() =>(
        Gesture.Pan()
            .onBegin((_e) => {

            })
            .onUpdate((_e) => {
                offset.value = {
                    x: _e.translationX + start.value.x,
                    y: _e.translationY + start.value.y
                }
            })
            .onEnd((_e) => {
                offset.value = {
                    x: start.value.x,
                    y: start.value.y
                }

            })
    ), [cards])

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [
            {translateX: withSpring(offset.value.x)},
            {translateY: withSpring(offset.value.y + translateY)},
            {scaleX: withSpring(scale)}
        ]
    }))



  return (
    <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.card, {backgroundColor}, animatedStyles ]}>
            <Text style={{fontSize: 42, color: "#fff", fontWeight: "bold", textTransform: "uppercase"}}>{name}</Text>
        </Animated.View>
    </GestureDetector>
  )
}

export default Card