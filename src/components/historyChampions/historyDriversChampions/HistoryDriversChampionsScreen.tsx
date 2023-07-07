import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import DriversChampions from './DriversChampions';

const HistoryDriversChampions = () => {
    return (
        <ScrollView style={styles.container}>
            <DriversChampions />
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