import { Dimensions, StyleSheet, Text, View } from 'react-native'
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated'
import { mix } from 'react-native-redash'


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

const Card  = ({position, name, backgroundColor, activeState, cardsLength}) => {
    const scaleX = mix(position, 1, 0.94)
    console.log(position)
    const animatedStyles = useAnimatedStyle(() =>( {
        transform: [
            {translateY: interpolate(
                activeState.value,
                [position - 1, position],
                [-10, 0],
                // {extrapolateRight: }
            )},
            {translateX: interpolate(
                activeState.value,
                [position, position + 1],
                [0, width + width / 2],
                {extrapolateLeft: Extrapolation.CLAMP}
            )},
            {scaleX: interpolate(
                activeState.value,
                [position - 1, position, position + 1],
                [0.95 , 1, 0]
            )},

            {scaleY: interpolate(
                activeState.value,
                [position - 1, position, position + 1],
                [1 , 1, 0]
            )}
        ]
    })) 
    
  return (
    <Animated.View style={[styles.card, {backgroundColor}, animatedStyles]}>
        <Text style={{fontSize: 42, color: "#fff", fontWeight: "bold", textTransform: "uppercase"}}>{name}</Text>
    </Animated.View>
  )
}

export default Card