import { Dimensions, StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React, { useEffect, useState, useRef }  from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import VideoPlayer from './VideoPlayer'
import ImageDisplay from './ImageDisplay'
import Profile from './Profile'


// gesture and animation imports 
import { GestureDetector, Gesture, TouchableOpacity, Directions } from 'react-native-gesture-handler'
import Animated, { 
    runOnJS, 
    useAnimatedStyle, 
    useSharedValue, 
    withTiming, 
    Easing,
    withSpring,
    withDelay,
    interpolate,
} from 'react-native-reanimated'
import UserPage from './UserPage'


const {width, height} = Dimensions.get("window")
const styles = StyleSheet.create({
    tik: {
        width, 
        height,
        justifyContent: "center"
    },

    headerIcons: {
        position: "absolute",
        top: 20,
        left: 0,
        zIndex: 2,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        width
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
        zIndex: 5
    },

    indicatorBackground: {
        height: 1.5,
        flexGrow: 1,
        backgroundColor: "#aaa5",
    },

    videoIndicator: {
        position: "absolute",
        bottom: 0,
        left: 0,
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
        justifyContent: "space-between",
        height: 1,
        width,
        alignSelf: "center",
        zIndex: 5
    },

    indicator: {
        height: "100%",
        width: "0%",
        backgroundColor: "#fffc"
    },

    userpage: {
        width,
        height,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0c0d34",
        zIndex: 10,
        position: "absolute",
        top: 0,
        left: 0
    }

})

const Videos = ({user, activeUserId, currentIndex, setCurrentIndex, updateStoriesState}) => {
    const [status, setStatus ] = useState({})
    const [currentStory, setCurrentStory] = useState(user.stories[currentIndex])
    const [vidIsLoading, setVidIsLoading] = useState(false)
    const tikRef = useRef(null)
    const playButtonScale = useSharedValue(false)
    const vprogress = useSharedValue(0)
    const mprogress = useSharedValue(0)
    const [videoProgress, setVideoProgress] = useState(0) 
    const muted = useSharedValue(true)
    const userPageInView = useSharedValue(false)
    const start = useSharedValue({
        x: 0,
        y: 0
    })
    const end = useSharedValue({
        x: 0,
        y: 0
    })

    // go to next story 
    const next = () => {
        setCurrentIndex(prev => prev >= user.stories.length - 1 ? user.stories.length - 1 : currentIndex + 1 )
        setVideoProgress(prev => 0)
        vprogress.value = 0
    }

    // go to prev story 
    const back = () => {
        setVideoProgress(prev => 0)
        vprogress.value = 0
        setCurrentIndex(prev => prev <= 0 ? 0 : prev - 1 )
    }





    {/** update current story on index change */}
    useEffect(() => {
        setCurrentStory(prev => user.stories[currentIndex])
    }, [currentIndex])


    {/*** Update video story indicator progress on current index and user id change */}
    useEffect(() => {
        if(user.stories[currentIndex].storyType === "video"){
            // console.log("~~~~ Video in View ~~~~")
            vprogress.value = withTiming(videoProgress, {
                duration: 500,
                easing: Easing.linear
            })
            // console.log("video progress: ", vprogress.value)
        }
    }, [currentIndex, activeUserId, status])

    {/*** update photo story indicator progress on current index or user id change */}
    useEffect(() => {
        if (user.stories[currentIndex].storyType === "image") {
            // console.log("~~~~~~~ Photo In View ~~~~~~~~")
            setVideoProgress(prev => 0)
            mprogress.value = 0
            mprogress.value = withTiming(1, {
                duration: 10 * 1000,
                easing: Easing.linear
            })
        }
    }, [activeUserId, currentIndex])

    {/** update stories indicator progress based on playback.didJustFinished */}
    const updateProgressValueToOne = () => {
        vprogress.value = 1
        setVideoProgress(prev => 0)
    }

    // status indicator with animation
    const statusIndicatorAnimatedStyle = useAnimatedStyle(() => {
        if (currentStory.storyType === "video"){
            return {
                width: `${vprogress.value * 100}%`
            }
        }else if (currentStory.storyType === "image") {
            return {
                width: `${mprogress.value * 100}%`
            }
        }
    })


    // global toggle play and pause icon function
    const togglePlayAndPause = (value) => playButtonScale.value = value

    const animatedScaleHigh = useAnimatedStyle(() => ({
        transform: [
            {
                scale: withDelay(300, withSpring(interpolate(
                    muted.value,
                    [false, true],
                    [1, 0]
                ), {duration: 300}))
            }
        ]
    }))

    const animatedScaleMute = useAnimatedStyle(() => ({
        transform: [
            {
                scale: withDelay(300, withSpring(interpolate(
                    muted.value,
                    [true, false],
                    [1, 0]
                ), {duration: 300}))
            }
        ]
    }))


    {/**** gestures and animations */}

    const updatePageAnimatedView = (value) => {
        userPageInView.value = value
        console.log(userPageInView.value)
    }

    {/*** Bring any form or necessary action requited in view */}
    const drag = Gesture.Pan()
        .onBegin((_e) => {
            start.value = {
            x: _e.translationX,
            y: _e.translationY
            }
        })

        .onUpdate((_e) => {
            end.value = {
            x: _e.translationX,
            y: _e.translationX
            }
            // scale.value = 1 - ((end.value.x - start.value.x) / 100) * 4
            // console.log(scale.value)
        })
        .onEnd((_e) =>{
            if((end.value.x - start.value.x) < 100){
                // scale.value = 1
                
            }else {
                // storiesInView.value = false
                // scale.value = 0
            }

            end.value = {
                x: 0,
                y: 0
            }
            start.value = {
                x: 0,
                y: 0
            }
        }).minPointers(2)

    
    const userPageAnimatedStyle = useAnimatedStyle(() => ({
        transform: [
            {translateX: withTiming(interpolate(
                userPageInView.value,
                [true, false],
                [0, height],

            ), {duration: 1000, easing: Easing.linear})}
        ]
    }))

    const flingLeft = Gesture.Fling().direction(Directions.LEFT)
    .onStart((_e) => {
      {/** bring profile page to view */}
      runOnJS(updatePageAnimatedView)(true)
      // runOnJS(setInView) (false)
      console.log("flung right")
      console.log(userPageInView.value)
    })


  return (
      
      <View style={styles.tik}>
            {/** Video Player and Image Display */}
            <GestureDetector gesture={flingLeft}>
                <View style={{flex: 1}}>
                    {user.stories[currentIndex].storyType === "video" ? (
                        <>
                            <VideoPlayer 
                                playerRef={tikRef}
                                source={user.stories[currentIndex].source}
                                setStatus={setStatus}
                                status={status}
                                isLoading={vidIsLoading}
                                setIsLoading={setVidIsLoading}
                                activeUserId={activeUserId}
                                user={user}
                                currentIndex={currentIndex}
                                playButtonScale={playButtonScale}
                                togglePlayAndPause={togglePlayAndPause}
                                setVideoProgress={setVideoProgress}
                                updateProgressValueToOne={updateProgressValueToOne}
                                next={next}
                                back={back}
                                muted={muted}
                                profile={<Profile 
                                    name={user.name} 
                                    username={user.username} 
                                    profilePhotoUrl={user.profilePhotoUrl}
                                    description={user.stories[currentIndex].storyType}
                                    type="video"
                                    animatedScaleMute={animatedScaleMute}
                                    animatedScaleHigh={animatedScaleHigh}
                                    muted={muted}
                                />}
                            />
                            {/* <View style={[styles.indicatorBackground, styles.videoIndicator, ]}>
                                <Animated.View style={[styles.indicator, statusIndicatorAnimatedStyle, {backgroundColor: "skyblue"}]} />
                            </View> */}
                        </>
                        ) :

                        <ImageDisplay 
                            source={user.stories[currentIndex].source}
                            next={next}
                            back={back}
                            profile={<Profile 
                                name={user.name} 
                                username={user.username} 
                                profilePhotoUrl={user.profilePhotoUrl}
                                description={user.stories[currentIndex].storyType}
                                type="image"
                            />}
                        />
                    }

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

                    {/*** Header is at this position because their zIndex weren't somehow getting shown behind the images and videos */}
                    <View style={styles.headerIcons}>
                    <View style={{flexDirection: "column-reverse", gap: 10, alignItems: "center"}}>
                        <TouchableOpacity
                            onPress={ () => updateStoriesState(undefined)}
                            style={styles.backBtn}
                        >
                            <EvilIcons name="chevron-left"  size={38} color="#fff" />
                        </TouchableOpacity>
                    </View>

                        <View style={{flexDirection: "row", gap: 10, alignItems: "center"}}>
                            <TouchableOpacity
                                onPress={ () => null}
                                style={[styles.backBtn, {marginLeft: "auto"}]}
                            >
                                <EvilIcons name="search"  size={30} color="#fff" />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={ () => null}
                                style={styles.backBtn}
                            >
                                <MaterialCommunityIcons name="dots-vertical"  size={27} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </GestureDetector>

            {/*** user page component */}
            <Animated.View style={[styles.userpage, userPageAnimatedStyle]}>
                <UserPage 
                    animatedStyle={userPageAnimatedStyle}
                    updatePageAnimatedView={updatePageAnimatedView}
                />
            </Animated.View>
        </View>
  )
}

export default Videos
