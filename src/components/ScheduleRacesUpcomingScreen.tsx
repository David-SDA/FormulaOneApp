import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const ScheduleRacesUpcomingScreen = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [scheduleRaces, setScheduleRaces] = useState([]);

    const getData = async () => {
        const url = 'http://ergast.com/api/f1/current.json';

        try{
            const response = await fetch(url);
            const json = await response.json();
            setScheduleRaces(json.MRData.RaceTable.Races);
            // console.log(scheduleRaces);
        }catch(error){
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <View style={{flex: 1, backgroundColor: '#1e1e1e'}}>
            {
                isLoading? (
                    <View style={{flex: 1, flexDirection:'column', justifyContent: 'center'}}>
                        <ActivityIndicator size={'large'} color={'#ff1801'} />
                    </View>
                ):(
                    <ScrollView contentContainerStyle={{paddingHorizontal: 10}}>
                        {
                            scheduleRaces.map((item, index) => {
                                let dateDebut = new Date(item?.FirstPractice?.date);
                                let dateFin = new Date(item?.date);
                                return (
                                    <View key={index} style={styles.oneBox}>
                                        <View style={styles.roundContainer}>
                                            <Text style={{fontWeight: '900'}}>ROUND</Text>
                                            <Text style={{fontWeight: 'bold'}}>{item?.round}</Text>
                                        </View>
                                        <Text>{item?.raceName}</Text>
                                        <View style={styles.dates}>
                                            <View style={styles.datesNumbers}>
                                                <Text>{dateDebut.getDate() < 10 ? '0' + dateDebut.getDate() : dateDebut.getDate()}</Text>
                                                <Text> - </Text>
                                                <Text>{dateFin.getDate() < 10 ? '0' + dateFin.getDate() : dateFin.getDate()}</Text>
                                            </View>
                                            <Text style={styles.datesMonth}>{(dateDebut.getMonth() === dateFin.getMonth())? dateFin.toLocaleDateString('en-GB', {month: 'short'}) : dateDebut.toLocaleDateString('en-GB', {month: 'short'}) + ' - ' + dateFin.toLocaleDateString('en-GB', {month: 'short'})}</Text>
                                        </View>
                                    </View>
                                );
                            })
                        }
                    </ScrollView>
                )
            }
        </View>
    )
}

export default ScheduleRacesUpcomingScreen;

const styles = StyleSheet.create({
    oneBox:{
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 5,
        height: 70
    },
    roundContainer:{
        borderColor: '#000000',
        borderWidth: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dates:{
        borderColor: '#000000',
        borderWidth: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    datesNumbers:{
        borderColor: '#000000',
        borderWidth: 1,
        flexDirection: 'row',
    },
    datesMonth:{
        backgroundColor: '#E5E4E2',
        color: '#708090',
        padding: 6,
        borderRadius: 20,
        fontSize: 12,
        fontWeight: '900',
    }
})