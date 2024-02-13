import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Directions, Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { Extrapolation, interpolate, useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const {width, height} = Dimensions.get("window")
const styles = StyleSheet.create({
    card: {
        width: width * 0.75,
        height: height * 0.6,
        position: "absolute",
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1,
    },

    details: {
        position: "absolute",
        bottom: 80,
        left: 0,
        right: 0,
        height: 80,
        backgroundColor: "#00000089",
        borderRadius: 5,
        zIndex: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 50
    }
})

const Card  = ({position, name, backgroundColor, activeState, horizontalGestures}) => {
    const displayDetails = useSharedValue(false)
    const duration = 100

    const flingUp = Gesture.Fling().direction(Directions.UP)
        .onStart(() => {
            console.log("flung up")
            displayDetails.value = true
        }).requireExternalGestureToFail(horizontalGestures)

    const flingDown = Gesture.Fling().direction(Directions.DOWN)
        .onStart(() => {
            console.log("Flung down")
            displayDetails.value = false
        }).requireExternalGestureToFail(horizontalGestures)

    const verticalGestures = Gesture.Exclusive(flingUp, flingDown)

    const cardAnimatedStyles = useAnimatedStyle(() =>( {
        transform: [
            {translateY: withSpring(
                    displayDetails.value === false ? interpolate(
                        activeState.value,
                        [position - 1, position],
                        [-10, 0],
                    ) : - height / 10
                ) 
            },
            {translateX: withSpring(
                displayDetails.value === false? interpolate(
                    activeState.value,
                    [position, position + 1],
                    [ 0, width ],
                    {
                        extrapolateLeft: Extrapolation.CLAMP,
                    },
                ): 0
            )
            },
            {scaleX: withSpring(
                displayDetails.value === false ? interpolate(
                    activeState.value,
                    [position - 1, position, position + 1],
                    [0.95 , 1, 0]
                ): 1.05
            )
            },

            {scaleY: withSpring(
                displayDetails.value === false? interpolate(
                    activeState.value,
                    [position - 1, position, position + 1],
                    [1 , 1, 0]
                ): 1.05
            )
            }
        ]
    })) 

    const detailsAnimatedStyles = useAnimatedStyle(() => ({
        transform: [
            {translateY: withDelay(duration, 
                withSpring(interpolate(
                    displayDetails.value,
                    [true, false],
                    [180, 0]
                )))
            }
        ]
    }))
    
  return (
    <Animated.View style={[styles.card, cardAnimatedStyles]}>  
        <GestureDetector gesture={verticalGestures}>
            <View style={[{backgroundColor, zIndex: 1}, styles.card]}>
                <Text style={{fontSize: 42, color: "#fff", fontWeight: "bold", textTransform: "uppercase"}}>{name}</Text>
            </View>
        </GestureDetector>
        <Animated.View style={[styles.details, detailsAnimatedStyles]}>
            <TouchableOpacity onPress={() => null}>
                <Entypo name="arrow-long-left" size={25} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => null}>
                <FontAwesome5 name="expand-arrows-alt" size={25} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => null}>
                <Entypo name="arrow-long-right" size={25} color="#fff" />
            </TouchableOpacity>
        </Animated.View>
    </Animated.View>
  )
}

export default Card