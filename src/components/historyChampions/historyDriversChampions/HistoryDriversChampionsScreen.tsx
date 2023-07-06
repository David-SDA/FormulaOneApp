import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';

import DriversChampions2010s2020s2030s from './DriversChampions2010s2020s2030s';
import DriversChampions1980s1990s2000s from './DriversChampions1980s1990s2000s';
import DriversChampions1950s1960s1970s from './DriversChampions1950s1960s1970s';

const HistoryDriversChampions = () => {
    return (
        <ScrollView style={styles.container}>
            <DriversChampions2010s2020s2030s />
            <DriversChampions1980s1990s2000s />
            <DriversChampions1950s1960s1970s />
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