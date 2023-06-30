import React, { useState } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import StandingsScreen from './src/components/StandingsScreen';
import ScheduleRacesScreen from './src/components/ScheduleRacesScreen';

const Tab = createBottomTabNavigator();

const App = () => {

    return (
        <NavigationContainer>
            <StatusBar backgroundColor={'#ff1801'} />
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName: string;

                        if(route.name === 'STANDINGS'){
                            iconName = focused ? 'racing-helmet' : 'racing-helmet';
                            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                        }
                        else if(route.name === 'SCHEDULE'){
                            iconName = focused ? 'calendar' : 'calendar-outline';
                            return <Ionicons name={iconName} size={size} color={color} />;
                        }
                    },
                    headerStyle: {
                        backgroundColor: '#ff1801',
                    },
                    headerTitleStyle: {
                        color: '#ffffff',
                        fontWeight: 'bold'
                    },
                    tabBarActiveTintColor: '#ff1801',
                    tabBarInactiveTintColor: '#a9a9a9',
                    tabBarStyle: {
                        backgroundColor: '#ffffff',
                        height: 50,
                    },
                  })}
            >
                <Tab.Screen name='SCHEDULE' component={ScheduleRacesScreen} />
                <Tab.Screen name='STANDINGS' component={StandingsScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default App;