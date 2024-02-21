import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, {useEffect} from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Video, ResizeMode } from 'expo-av'
import Loading from './Loading'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"



// animation and gesture imports 
import 
  Animated, 
  {
    useAnimatedStyle, 
    withTiming, 
    withDelay,
    Easing
} from 'react-native-reanimated'

const {height, width} = Dimensions.get("window")

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    zIndex: -1,
    justifyContent: "center"
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
    zIndex: 3
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
        // togglePlayAndPause(true)
      }

    }


    // manually play video
    const playVideoAsync = () => {
      if (!playerRef.current) {
          return
      }

      
      if(activeUserId === user.id) {
        playerRef.current.playAsync()
        togglePlayAndPause(false)
      }
    }
  

    // play button scale animation
    const playButtonScaleAnimation = useAnimatedStyle(() => ({
      transform: [
          {scale: playButtonScale.value === true ?(
            withTiming(1, {duration: 100, easing: Easing.bounce})
          ): (withDelay(1000, withTiming(0, {duration: 100, easing: Easing.bounce})))
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
            isLooping={true}
            isMuted={true}
            progressUpdateIntervalMillis={600}
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
