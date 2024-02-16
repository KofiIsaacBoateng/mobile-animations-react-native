import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import { Video, ResizeMode } from 'expo-av'



const styles = StyleSheet.create({
    video: {
        width: "100%",
        height: "100%",
        zIndex: -1
    },
})

const VideoPlayer = ({playerRef, source, profile, setStatus}) => {

  return (
    <View style={{flex: 1}}>
        <Video
            ref = {playerRef}
            source={source}
            style={styles.video}
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            isMuted
            onPlaybackStatusUpdate={(status) => setStatus(prev => status)}
        />

        {profile}
    </View>
  )
}

export default VideoPlayer
