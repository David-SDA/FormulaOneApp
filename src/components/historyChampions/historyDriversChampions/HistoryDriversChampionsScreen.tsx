import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import DriversChampions1950s from './DriversChampions1950s';

const HistoryDriversChampions = () => {
    return (
        <ScrollView style={styles.container}>
            <DriversChampions1950s />
            <View>
                <Text>1960's</Text>
                <Text>1960: Jack Brabham</Text>
                <Text>1961: Phill Hill</Text>
            </View>
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