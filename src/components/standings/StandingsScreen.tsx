import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import StandingsDriverScreen from './StandingsDriverScreen';
import StandingsConstructorScreen from './StandingsConstructorScreen';

const Tab = createMaterialTopTabNavigator();

const StandingsScreen = () => {
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
            <Tab.Screen name='Drivers' component={StandingsDriverScreen} />
            <Tab.Screen name='Constructors' component={StandingsConstructorScreen} />
        </Tab.Navigator>
    )
}

export default StandingsScreen;