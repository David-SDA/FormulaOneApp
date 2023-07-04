import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ConstructorsChampions1958_1987 from './ConstructorsChampions1958_1987'

const HistoryConstructorChampionsScreen = () => {
  return (
    <ScrollView style={styles.container}>
        <ConstructorsChampions1958_1987 />
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