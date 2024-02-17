import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import { Video, ResizeMode } from 'expo-av'
import Loading from './Loading'



const styles = StyleSheet.create({
    video: {
        width: "100%",
        height: "100%",
        zIndex: -1
    },
})

const VideoPlayer = ({
  playerRef, 
  source, 
  profile, 
  setStatus, 
  isLoading, 
  setIsLoading,
  updateProgressValueToOne
}) => {

  const onPlaybackStatusUpdate = playbackStatus => {
    setStatus(prev => playbackStatus)

    if(!playbackStatus.isLoaded && !playbackStatus.disJustFinished){
      setIsLoading(prev => true)
      console.log("is loading")
    }else {
      setIsLoading(prev => false)
    } 

    if(playbackStatus.playableDurationMillis === playbackStatus.positionMillis && playbackStatus.playableDurationMillis !== playbackStatus.durationMillis){
      setIsLoading(prev => true)
    } else {
      setIsLoading(prev => false)
    }


    if(playbackStatus.disJustFinished){
      updateProgressValueToOne()
    }

  }

  return (
    <View style={{flex: 1}}>
        <Video
            ref = {playerRef}
            source={source}
            style={styles.video}
            resizeMode={ResizeMode.CONTAIN}
            isLooping={false}
            isMuted={true}
            progressUpdateIntervalMillis={1000}
            onPlaybackStatusUpdate={onPlaybackStatusUpdate}
        />
        {profile}
        {isLoading && (
          <Loading />
        )
        }
    </View>
  )
}

export default VideoPlayer
