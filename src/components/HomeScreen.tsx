import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { flags } from '../../constants';

const HomeScreen = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [nextRace, setNextRace] = useState([]);

    const getData = async () => {
        const url = 'http://ergast.com/api/f1/current/next.json';

        try{
            const response = await fetch(url);
            const json = await response.json();
            setNextRace(json.MRData.RaceTable.Races);
            // console.log(nextRace);
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
                            nextRace.map((item, index) => {
                                let dateDebut = new Date(item?.FirstPractice?.date);
                                let dateFin = new Date(item?.date);

                                if(dateFin >= new Date()){
                                    return (
                                        <View key={index} style={styles.oneBox}>
                                            <View style={styles.roundContainer}>
                                                <Text style={styles.roundText}>ROUND</Text>
                                                <Text style={styles.roundNumber}>{item?.round}</Text>
                                                <Text></Text>
                                            </View>
                                            <View style={styles.bar}></View>
                                            <Image source={flags[item?.Circuit?.Location?.country]} style={styles.flag} />
                                            <Text style={styles.raceName}>{item?.raceName.toUpperCase()}</Text>
                                            <View style={styles.bar}></View>
                                            <View style={styles.dates}>
                                                <View style={styles.datesNumbers}>
                                                    <Text style={styles.dateNumber}>{dateDebut.getDate() < 10 ? '0' + dateDebut.getDate() : dateDebut.getDate()}</Text>
                                                    <Text> - </Text>
                                                    <Text style={styles.dateNumber}>{dateFin.getDate() < 10 ? '0' + dateFin.getDate() : dateFin.getDate()}</Text>
                                                </View>
                                                <Text style={styles.datesMonth}>{(dateDebut.getMonth() === dateFin.getMonth())? dateFin.toLocaleDateString('en-GB', {month: 'short'}) : dateDebut.toLocaleDateString('en-GB', {month: 'short'}) + ' - ' + dateFin.toLocaleDateString('en-GB', {month: 'short'})}</Text>
                                            </View>
                                        </View>
                                    );
                                }
                            })
                        }
                    </ScrollView>
                )
            }
        </View>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    oneBox:{
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 5,
        height: 70,
        borderRadius: 10,
    },
    roundContainer:{
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '20%',
    },
    roundText:{
        fontWeight: '900',
        letterSpacing: 0.5,
        color: '#708090',
    },
    roundNumber:{
        fontWeight: 'bold',
        fontSize: 20,
    },
    bar:{
        width: 1,
        height: 60,
        borderRadius: 10,
        backgroundColor: 'gray',
        alignSelf: 'center'
    },
    flag:{
        height: 30,
        width: 40,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    raceName:{
        width: '40%',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: '900',
    },
    dates:{
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '20%',
    },
    datesNumbers:{
        flexDirection: 'row',
    },
    dateNumber:{
        fontSize: 16,
        fontWeight: 'bold'
    },
    datesMonth:{
        backgroundColor: '#E5E4E2',
        color: '#708090',
        padding: 4,
        borderRadius: 20,
        fontSize: 10,
        fontWeight: '900',
    }
})