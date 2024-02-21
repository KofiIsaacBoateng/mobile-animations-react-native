import { Dimensions, StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React, { useEffect, useState, useRef }  from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import VideoPlayer from './VideoPlayer'
import ImageDisplay from './ImageDisplay'
import Profile from './Profile'
import updates from '../assets/updates'


// gesture and animation imports 
import { GestureDetector, Gesture } from 'react-native-gesture-handler'
import Animated, { 
    runOnJS, 
    useAnimatedStyle, 
    useSharedValue, 
    withDelay, 
    withTiming, 
    interpolate, 
    Easing,
    useAnimatedReaction
} from 'react-native-reanimated'


const {width, height} = Dimensions.get("window")
const styles = StyleSheet.create({
    tik: {
        width, 
        height,
        justifyContent: "center"
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
        top: 0,
        left: 0,
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
        backgroundColor: "#aaa5",
    },

    indicator: {
        height: "100%",
        width: "0%",
        backgroundColor: "#fff6"
    },

    play: {
        width: 70,
        height: 70,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#00000075",
        position: "absolute",
        alignSelf: "center",
    }

})

const Videos = ({user, activeUserId, currentIndex, setCurrentIndex}) => {
    const navigation = useNavigation()
    const [vidIsLoading, setVidIsLoading] = useState(false)
    const tikRef = useRef(null)
    const playButtonScale = useSharedValue(false)
    const progress = useSharedValue(0)
    const [videoProgress, setVideoProgress] = useState(0)

    // double tap function to play or pause video
    const onDoubleTap = () => {
        // console.log("onDoubleTap() called");
        if (!tikRef.current) {
            // console.log("tikRef.current is null");
            return;
        }
    
        // if (isPlaying) {
        //     console.log("Pausing the video");
        //     tikRef.current.pauseAsync();
        // } else {
        //     console.log("Playing the video");
        //     tikRef.current.playAsync();
        // }

        tikRef.current.pauseAsync();
    };

    // go to next story 
    const next = () => {
        setCurrentIndex(prev => prev >= user.stories.length - 1 ? user.stories.length - 1 : currentIndex + 1 )
        progress.value = 0
    }

    // go to prev story 
    const back = () => {
        setCurrentIndex(prev => prev <= 0 ? 0 : prev - 1 )
        progress.value = 0
    }


    // double tap gesture to pause video
    const doubleTap = Gesture.Tap().numberOfTaps(2)
        .onEnd((_e, success) => {
            if(success){ 
                // console.log("double tapped")
                runOnJS(onDoubleTap)()
                playButtonScale.value = true
            }
        })

    // single tap gesture to update current story
    const singleTap = Gesture.Tap()
        .onEnd((_e, success) => {
            // console.log("single tapped")
            if(success) {
                if (_e.x > width / 2){
                    runOnJS(next)()
                }else {
                    runOnJS(back)()
                }
            }
        })


    {/*** Update stories indicator progress on current index and user id change */}
    useEffect(() => {
        if(user.stories[currentIndex].storyType === "video"){
            console.log("~~~~ Video in View ~~~~")
            console.log("video progress: ", videoProgress)
            progress.value = withTiming(videoProgress, {
                duration: 1000,
                easing: Easing.linear
            })
        } else if (user.stories[currentIndex].storyType === "image") {
            console.log("~~~~~~~ Photo In View ~~~~~~~~")
            setVideoProgress(prev => 0)
            progress.value = 0
            progress.value = withTiming(1, {
                duration: 10 * 1000,
                easing: Easing.linear
            })
        }
    }, [currentIndex, activeUserId, videoProgress])

    {/** update stories indicator progress based on playback.didJustFinished */}
    const updateProgressValueToOne = () => progress.value = 1

    // status indicator with animation
    const statusIndicatorAnimatedStyle = useAnimatedStyle(() => {
        return {
            width: `${progress.value * 100}%`
        }
    })

    // watching progress to automate the playing the next story when done
    useAnimatedReaction(
        () => progress.value,
        (currentProgress, prevProgress) => {
            if(prevProgress !== currentProgress && progress.value && progress.value === 1 && currentIndex !== user.stories.length - 1 ) {
                runOnJS(next)()
            }
        }
    )

    // global toggle play and pause icon function
    const togglePlayAndPause = (value) => playButtonScale.value = value


    const tapGestures = Gesture.Exclusive(doubleTap, singleTap)

  return (
    <GestureDetector gesture={tapGestures}>
        <View style={styles.tik}>
            <View style={styles.statusIndicators} >
                {user.stories.map((story, index) => (
                    <View key = {`${index}-${story.source}`} style={styles.indicatorBackground}>
                        {(index < currentIndex) ? (
                                <View style={[styles.indicator, {width: "100%"}]} />
                            ): (index > currentIndex) ? (
                                <View style={[styles.indicator, {width: 0}]} />
                            ): (
                                <Animated.View style={[styles.indicator, statusIndicatorAnimatedStyle]} />
                            )
                        }

                    </View>
                ))}
            </View>
            <LinearGradient
                colors={["#000000ca", "transparent", "transparent", "transparent", "#000000"]}
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
                        onPress={ () => null}
                        style={[styles.backBtn, {marginLeft: "auto"}]}
                    >
                        <EvilIcons name="search"  size={38} color="#fff9" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={ () => null}
                        style={styles.backBtn}
                    >
                        <MaterialCommunityIcons name="dots-vertical"  size={32} color="#fff9" />
                    </TouchableOpacity>
                </View>
            </View>

            {/** Video Player and Image Display */}

            {user.stories[currentIndex].storyType === "video" ? (
                <>
                    <VideoPlayer 
                        playerRef={tikRef}
                        source={user.stories[currentIndex].source}
                        // setStatus={setStatus}
                        isLoading={vidIsLoading}
                        setIsLoading={setVidIsLoading}
                        activeUserId={activeUserId}
                        user={user}
                        currentIndex={currentIndex}
                        playButtonScale={playButtonScale}
                        togglePlayAndPause={togglePlayAndPause}
                        setVideoProgress={setVideoProgress}
                        updateProgressValueToOne={updateProgressValueToOne}
                        profile={<Profile 
                            name={user.name} 
                            username={user.username} 
                            profilePhotoUrl={user.profilePhotoUrl}
                            description={user.stories[currentIndex].storyType}
                            type="video" 
                        />}
                    />
                </>
                ) :

                <ImageDisplay 
                    source={user.stories[currentIndex].source}
                    profile={<Profile 
                        name={user.name} 
                        username={user.username} 
                        profilePhotoUrl={user.profilePhotoUrl}
                        description={user.stories[currentIndex].storyType}
                        type="image"
                    />}
                />
            }
        </View>
    </GestureDetector>
  )
}

export default Videos
