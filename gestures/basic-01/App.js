import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {NavigationContainer} from "@react-navigation/native"
import {createDrawerNavigator} from "@react-navigation/drawer"
import DrawerContent from './components/DrawerContent'
import PanGesture from './gestures/PanGesture'
import TapGesture from './gestures/TapGesture'
import PanTap from './gestures/PanTap'
import ScrollGestures from './gestures/ScrollGestures'
import Status from './gestures/Status'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const Drawer = createDrawerNavigator()

const App = () => {
  return (
    <NavigationContainer>
        <GestureHandlerRootView style={{flex: 1}}>
        <Drawer.Navigator
          initialRouteName='PanGestures'
          drawerContent={DrawerContent}
          screenOptions={{
            header: () => null
          }}
        >
          <Drawer.Screen name="PanGesture" component={PanGesture} />
          <Drawer.Screen name="TapGesture" component={TapGesture} />
          <Drawer.Screen name="PanTap" component={PanTap} />
          <Drawer.Screen name="Status" component={Status} />
          <Drawer.Screen name="ScrollGestures" component={ScrollGestures} />
        </Drawer.Navigator>
      </GestureHandlerRootView>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})