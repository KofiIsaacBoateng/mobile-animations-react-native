import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {NavigationContainer} from "@react-navigation/native"
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import {createDrawerNavigator} from "@react-navigation/drawer"
import DrawerContent from './components/DrawerContent'
import StackedCards from './screens/PanGesture'
import TapGesture from './screens/TapGesture'
import PanTap from './screens/PanTap'
import ScrollGestures from './screens/ScrollGestures'
import Status from './screens/Status'

const Drawer = createDrawerNavigator()

const App = () => {
  return (
    <NavigationContainer>
        <GestureHandlerRootView style={{flex: 1}}>
        <Drawer.Navigator
          initialRouteName='StackedCards'
          drawerContent={DrawerContent}
          screenOptions={{
            header: () => null
          }}
        >
          <Drawer.Screen name="StackedCards" component={StackedCards} />
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