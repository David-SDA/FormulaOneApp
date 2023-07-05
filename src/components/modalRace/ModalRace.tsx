import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ModalRaceSchedule from './ModalRaceSchedule';
import ModalRaceInfo from './ModalRaceInfo';

const Tab = createBottomTabNavigator();

const ModalRace = ({round, trackId}) => {
    return (
        <ScrollView>
            <ModalRaceSchedule round={round} />
            <ModalRaceInfo trackId={trackId} />
        </ScrollView>
    )
}

export default ModalRace;

const styles = StyleSheet.create({
    
})