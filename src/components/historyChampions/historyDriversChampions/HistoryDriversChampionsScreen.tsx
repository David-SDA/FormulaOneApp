import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import DriversChampions1950s from './DriversChampions1950s';
import DriversChampions1960s from './DriversChampions1960s';
import DriversChampions1970s from './DriversChampions1970s';

const HistoryDriversChampions = () => {
    return (
        <ScrollView style={styles.container}>
            <DriversChampions1950s />
            <DriversChampions1960s />
            <DriversChampions1970s />
        </ScrollView>
  )
}

export default HistoryDriversChampions

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#1e1e1e',
    }
})