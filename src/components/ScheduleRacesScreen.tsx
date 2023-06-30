import { StyleSheet } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ScheduleRacesUpcomingScreen from './ScheduleRacesUpcomingScreen';
import ScheduleRacesPastScreen from './ScheduleRacesPastScreen';

const Tab = createMaterialTopTabNavigator();

const ScheduleRacesScreen = () => {
  return (
    <Tab.Navigator
            screenOptions={{
                tabBarStyle:{
                    backgroundColor: '#ff1801',
                },
                tabBarActiveTintColor: '#ffffff',
                tabBarLabelStyle:{
                    fontWeight: 'bold',
                },
                tabBarIndicatorStyle:{
                    backgroundColor: '#ffffff'
                }
            }}
        >
            <Tab.Screen name='UPCOMING' component={ScheduleRacesUpcomingScreen} />
            <Tab.Screen name='PAST' component={ScheduleRacesPastScreen} />
        </Tab.Navigator>
  )
}

export default ScheduleRacesScreen;

const styles = StyleSheet.create({})