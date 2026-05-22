import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const APP = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Coffee Shop</Text>
    </View>
  )
}

export default APP

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    
  },
  text: {
    top:20,
    color:'blue',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})