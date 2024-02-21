import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Video, ResizeMode } from 'expo-av'
import Loading from './Loading'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"



// animation and gesture imports 
import 
  Animated, 
  {
    useAnimatedStyle, 
    useDerivedValue,
    withTiming, 
    withDelay,
    interpolate,
    Easing
} from 'react-native-reanimated'

const {height, width} = Dimensions.get("window")

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    zIndex: -1
  },
    video: {
        width: "100%",
        height: "100%",
        zIndex: -1
    },

    overlay: {
      height, 
      width,
      position: "absolute",
      left: 0,
      top: 0,
      zIndex: 1
  },

  bottom: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    height: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 2
}
})

const VideoPlayer = ({
  playerRef, 
  source,
  user,
  activeUserId,
  currentIndex,
  profile,
  isLoading, 
  setIsLoading,
  setVideoProgress,
  updateProgressValueToOne,
  playButtonScale,
  togglePlayAndPause,
  status,
  setStatus
}) => {
    const isPlaying = status.isPlaying ? true: false

    // auto play video if in view
    useEffect(() => {
      if(!playerRef.current) return

      if(activeUserId !== user.id){
          playerRef.current.pauseAsync()
          togglePlayAndPause(true)
      }

      if(activeUserId === user.id) {
          playerRef.current.playAsync()
          togglePlayAndPause(false)
      }

    }, [activeUserId, playerRef.current])



    {/*** Update stories indicator progress when video is in view */}

    useEffect(() => {
        const durationMillis = status?.durationMillis // total play time  for video
        const positionMillis = status?.positionMillis // play progress level for video

        if(durationMillis === undefined || positionMillis === undefined){
            console.log("undefined: durationMillis - positionMillis\n", durationMillis, " - ", positionMillis)
            setVideoProgress(prev => 0)
        }else {
            console.log("defined: durationMillis - positionMillis\n", durationMillis, " - ", positionMillis)
            setVideoProgress(prev => positionMillis / durationMillis)
        }
    }, [status, activeUserId, currentIndex])


    {/** playback update */}
    const onPlaybackStatusUpdate = playbackStatus => {
      setStatus(prev => playbackStatus)

      if(!playbackStatus.isLoaded && !playbackStatus.disJustFinished){
        setIsLoading(prev => true)
        // console.log("is loading")
      }else {
        setIsLoading(prev => false)
      } 

      if(playbackStatus.playableDurationMillis === playbackStatus.positionMillis 
        && playbackStatus.playableDurationMillis !== playbackStatus.durationMillis
      ){
        setIsLoading(prev => true)
      } else {
        setIsLoading(prev => false)
      }


      if(playbackStatus.disJustFinished){
        updateProgressValueToOne()
      }

    }


    // manually play video
    const playVideoAsync = () => {
      if (!tikRef.current) {
          return
      }

      tikRef.current.playAsync()
      togglePlayAndPause(true)
    }
  

    // play button scale animation
    const playButtonScaleAnimation = useAnimatedStyle(() => ({
      transform: [
          {scale: withDelay(1000, withTiming(interpolate(
                  playButtonScale.value,
                  [false, true],
                  [0, 1]
              )))
          }
      ]
    }))
    

  return (
    <View style={styles.container}>

        {/** gradient overlay  */}
        <LinearGradient
          colors={["#000000aa", "transparent", "transparent", "transparent", "#000000c2"]}
          style={styles.overlay}
        />
        <Video
            ref = {playerRef}
            source={source}
            style={styles.video}
            resizeMode={ResizeMode.CONTAIN}
            isLooping={false}
            isMuted={true}
            progressUpdateIntervalMillis={800}
            onPlaybackStatusUpdate={onPlaybackStatusUpdate}
        />
        <View style={styles.bottom}>
          {profile}
        </View>

        {/** play icon */}
        <Animated.View style={[styles.play, playButtonScaleAnimation]}>
          <TouchableOpacity
              onPress={playVideoAsync}
          >
              {playButtonScale.value ?(
                  <FontAwesome5 size={24} name="play" color="#fff" />
              ): (
                  <FontAwesome5 size={24} name="pause" color="#fff" />
              )

              }
          </TouchableOpacity>

        </Animated.View>
        {isLoading === true && (
          <Loading />
        )
        }
    </View>
  )
}

export default VideoPlayer
