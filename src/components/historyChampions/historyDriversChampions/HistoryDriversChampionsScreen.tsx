import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import DriversChampions1950s from './DriversChampions1950s';
import DriversChampions1960s from './DriversChampions1960s';
import DriversChampions1970s from './DriversChampions1970s';
import DriversChampions1980s from './DriversChampions1980s';
import DriversChampions1990s from './DriversChampions1990s';
import DriversChampions2000s from './DriversChampions2000s';
import DriversChampions2010s from './DriversChampions2010s';
import DriversChampions2020s from './DriversChampions2020s';

const HistoryDriversChampions = () => {
    return (
        <ScrollView style={styles.container}>
            <DriversChampions2020s />
            <DriversChampions2010s />
            <DriversChampions2000s />
            <DriversChampions1990s />
            <DriversChampions1980s />
            <DriversChampions1970s />
            <DriversChampions1960s />
            <DriversChampions1950s />
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