import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import Card from '../components/Card'

const PanGesture = () => {
  const [cards, setCards ] = useState( [
    {
      id: 1, 
      name: "card 4",
      index: 3,
      background: "#cc1800e7"
    },
  
    {
      id: 2, 
      name: "card 3",
      index: 2,
      background: "#47cc00e7"
    },
  
    {
      id: 3, 
      name: "card 2",
      index: 1,
      background: "purple"
    },
  
    {
      id: 4,
      name: "card 1",
      index: 0,
      background: "#0c0d34"
    }
  ])
  
  return (
    <View  style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
        {cards.map((card, _i) => (
          <Card
            key={_i}
            index={_i}
            position={card.index}
            name={card.name}
            backgroundColor={card.background}
            cards={cards}
            setCards={setCards}
          />
        ))}
    </View>
  )
}

export default PanGesture

const styles = StyleSheet.create({})