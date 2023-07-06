import { StyleSheet } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HistoryDriversChampions from './historyDriversChampions/HistoryDriversChampionsScreen';
import HistoryConstructorChampionsScreen from './historyConstructorsChampions/HistoryConstructorChampionsScreen';
import HistoryCircuits from './historyCircuits/HistoryCircuits';

const Tab = createMaterialTopTabNavigator();

const HistoryScreen = () => {
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
                <Tab.Screen name='DRIVERS' component={HistoryDriversChampions} />
                <Tab.Screen name='CONSTRUCTORS' component={HistoryConstructorChampionsScreen} />
                <Tab.Screen name='TRACKS' component={HistoryCircuits} />
            </Tab.Navigator>
      )
}

export default HistoryScreen

const styles = StyleSheet.create({})