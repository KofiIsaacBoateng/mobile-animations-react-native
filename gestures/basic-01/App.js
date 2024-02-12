import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {NavigationContainer} from "@react-navigation/native"
import {createDrawerNavigator} from "@react-navigation/drawer"
import DrawerContent from './components/DrawerContent'
import PanGesture from './gestures/PanGesture'
import TapGesture from './gestures/TapGesture'
import PanTap from './gestures/PanTap'

const Drawer = createDrawerNavigator()

const App = () => {
  return (
    <NavigationContainer>
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
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})