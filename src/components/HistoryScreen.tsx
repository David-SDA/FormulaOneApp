import { StyleSheet } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HistoryDriversChampions from './historyChampions/historyDriversChampions/HistoryDriversChampionsScreen';
import HistoryConstructorChampionsScreen from './historyChampions/historyConstructorsChampions/HistoryConstructorChampionsScreen';

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
                <Tab.Screen name='CONSTRUCTORS' component={HistoryConstructorChampionsScreen} />
                <Tab.Screen name='DRIVERS' component={HistoryDriversChampions} />
            </Tab.Navigator>
      )
}

export default HistoryScreen

const styles = StyleSheet.create({})