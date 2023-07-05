import React from 'react';
import { ScrollView, StatusBar, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ModalRaceSchedule from './ModalRaceSchedule';

const Tab = createBottomTabNavigator();

const ModalRace = ({round, trackId}) => {
    return (
        <ScrollView>
            <ModalRaceSchedule round={round} />
        </ScrollView>
    )
}

export default ModalRace;

const styles = StyleSheet.create({
    
})