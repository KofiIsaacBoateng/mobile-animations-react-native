import { Dimensions, StyleSheet, FlatList, View } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import updates from "../assets/updates"
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar'
import Vid from '../components/Vid'


const {height} = Dimensions.get("window")
const styles = StyleSheet.create({
    
})


const TikReels = ({updateStoriesState, clickedIndex}) => {
    const [activeUserId, setActiveUserId] = useState("")
    const [currentIndex, setCurrentIndex] = useState(0)
    const reelsRef = useRef(null)

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

    useEffect(() => {
        if(!reelsRef.current) return

        reelsRef.current.scrollToIndex({index: clickedIndex || 0, animated: true})
    }, [clickedIndex])

  return (
    <View style={{flex: 1, backgroundColor: "#000"}} >
            <ExpoStatusBar hidden />
            <FlatList
                ref={reelsRef}
                data={updates}
                style={[{height}]}
                keyExtractor={(user, index) => user.id}
                pagingEnabled={true}
                bounces={true}
                getItemLayout={(data, index) => ({
                    length: height,
                    offset: height * index,
                    index
                })}
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
