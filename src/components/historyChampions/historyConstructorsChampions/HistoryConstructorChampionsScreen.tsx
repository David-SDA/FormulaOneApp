import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ConstructorsChampions from './ConstructorsChampions'

const HistoryConstructorChampionsScreen = () => {
  return (
    <ScrollView style={styles.container}>
        <ConstructorsChampions />
    </ScrollView>
  )
}

export default HistoryConstructorChampionsScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#1e1e1e',
    }
})