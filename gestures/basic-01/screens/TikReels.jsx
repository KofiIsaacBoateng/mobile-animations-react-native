import { Dimensions, StyleSheet, FlatList, Text, View, Pressable } from 'react-native'
import React, { useRef, useState } from 'react'
import videos from "../assets/videos"
import updates from "../assets/updates"
import { ResizeMode, Video } from 'expo-av'
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar'
import Vid from '../components/Vid'


const {width, height} = Dimensions.get("window")
const styles = StyleSheet.create({
    
})


const TikReels = ({updateStoriesState, clickedIndex}) => {
    const [activeUserId, setActiveUserId] = useState("")
    const [currentIndex, setCurrentIndex] = useState(0)
    const viewabilityConfigPairs = useRef([
        {
            viewabilityConfig: {itemVisiblePercentThreshold: "50"},
            onViewableItemsChanged:  ({_changed, viewableItems}) => {
                if(viewableItems.length > 0 && viewableItems[0].isViewable){
                    setActiveUserId(prev => viewableItems[0].item.id)
                    setCurrentIndex(prev => 0)
                }
            }
        },
    ])

  return (
    <View style={{flex: 1, backgroundColor: "#000"}}>
            <ExpoStatusBar hidden />
            <FlatList
                data={updates}
                style={{}}
                keyExtractor={(user, index) => user.id}
                pagingEnabled={true}
                bounces={true}
                initialScrollIndex={clickedIndex}
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) => (
                    <Vid 
                        user={item} 
                        activeUserId={activeUserId}
                        currentIndex={currentIndex}
                        setCurrentIndex={setCurrentIndex}
                        updateStoriesState={updateStoriesState}
                    />
                )}
                viewabilityConfigCallbackPairs={viewabilityConfigPairs.current}
            />
    </View>
  )
}

export default TikReels
