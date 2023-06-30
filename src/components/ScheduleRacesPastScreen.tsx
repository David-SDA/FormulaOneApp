import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

const ScheduleRacesPastScreen = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [driverStandingsData, setDriverStandingsData] = useState([]);

    return (
        <View>
            <Text>CalendarPastScreen</Text>
        </View>
    )
}

export default ScheduleRacesPastScreen;

const styles = StyleSheet.create({})