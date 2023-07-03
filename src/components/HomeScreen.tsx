import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { flags } from '../../constants';
import { Shadow } from 'react-native-shadow-2';

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
                        <View>
                            <Text style={styles.titleHome}>NEXT RACE WEEKEND</Text>
                        </View>
                        {
                            nextRace.map((item, index) => {
                                let dateFP1 = new Date(item?.FirstPractice?.date + 'T' + item?.FirstPractice?.time);
                                let dateFP2 = new Date(item?.SecondPractice?.date + 'T' + item?.SecondPractice?.time);
                                let dateQuali = new Date(item?.Qualifying.date + 'T' + item?.Qualifying.time);
                                let dateRace = new Date(item?.date + 'T' + item?.time);

                                if(dateRace >= new Date() && item?.ThirdPractice){
                                    return (
                                        <View key={index} style={styles.container}>
                                            <View style={styles.roundContainer}>
                                                    <Image source={flags[item?.Circuit?.Location?.country]} style={styles.flag} />
                                                    <Text style={styles.raceName}>{item?.raceName.toUpperCase()}</Text>
                                            </View>
                                            <Text style={styles.scheduleTitleText}>SCHEDULE</Text>
                                            <View style={styles.sessionBox}>
                                                <Shadow distance={5} startColor='#00000010' style={styles.sessionBoxShadow}>
                                                    <View style={styles.sessionDate}>
                                                        <Text style={styles.sessionDay}>{dateRace.toLocaleDateString('en-GB', {day: '2-digit'})}</Text>
                                                        <Text style={styles.sessionMonth}>{dateRace.toLocaleDateString('en-GB', {month: 'short'})}</Text>
                                                    </View>
                                                    <View style={styles.verticalBar}></View>
                                                    <View style={styles.sessionTitleTime}>
                                                        <Text style={styles.sessionTitle}>RACE</Text>
                                                        <Text style={styles.sessionHour}>{dateRace.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'})}</Text>
                                                    </View>
                                                </Shadow>
                                            </View>
                                            <View style={styles.sessionBox}>
                                                <Text style={styles.sessionTitle}>QUALIFYING</Text>
                                            </View>
                                            <View style={styles.sessionBox}>
                                                <Text style={styles.sessionTitle}>FREE PRACTICE 3</Text>
                                            </View>
                                            <View style={styles.sessionBox}>
                                                <Text style={styles.sessionTitle}>FREE PRACTICE 2</Text>
                                            </View>
                                            <View style={styles.sessionBox}>
                                                <Text style={styles.sessionTitle}>FREE PRACTICE 1</Text>
                                            </View>
                                        </View>
                                    );
                                }
                                else{
                                    return (
                                        <View key={index} style={styles.container}>
                                            <View style={styles.roundContainer}>
                                                    <Image source={flags[item?.Circuit?.Location?.country]} style={styles.flag} />
                                                    <Text style={styles.raceName}>{item?.raceName.toUpperCase()}</Text>
                                            </View>
                                            <Text style={styles.scheduleTitleText}>SCHEDULE</Text>
                                            <View style={styles.sessionBox}>
                                                <Shadow distance={5} startColor='#00000010' style={styles.sessionBoxShadow}>
                                                    <Text style={styles.sessionTitle}>RACE</Text>
                                                    <Text>{dateRace.toLocaleDateString('en-GB', {day: '2-digit'})}</Text>
                                                    <Text>{dateRace.toLocaleDateString('en-GB', {month: 'short'})}</Text>
                                                    <Text>{dateRace.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'})}</Text>
                                                </Shadow>
                                            </View>
                                            <View style={styles.sessionBox}>
                                                <Text style={styles.sessionTitle}>SPRINT</Text>
                                            </View>
                                            <View style={styles.sessionBox}>
                                                <Text style={styles.sessionTitle}>FREE PRACTICE 2</Text>
                                            </View>
                                            <View style={styles.sessionBox}>
                                                <Text style={styles.sessionTitle}>QUALIFYING</Text>
                                            </View>
                                            <View style={styles.sessionBox}>
                                                <Text style={styles.sessionTitle}>FREE PRACTICE 1</Text>
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
    titleHome:{
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
        fontStyle: 'italic',
        alignSelf: 'center',
        marginTop: 5,
    },
    container:{
        backgroundColor: '#ffffff',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginVertical: 5,
        borderRadius: 10,
    },
    roundContainer:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '95%',
        marginVertical: 5,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    },
    flag:{
        height: 40,
        width: 60,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    raceName:{
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: '900',
        fontSize: 20,
        width: '80%',
        color: '#1e1e1e',
    },
    scheduleTitleText:{
        fontWeight: '900',
        letterSpacing: 0.2,
        fontSize: 16,
        fontStyle: 'italic',
        alignSelf: 'flex-start',
        marginLeft: '2.5%',
        color: '#1e1e1e'
    },
    sessionBox:{
        width: '95%',
        marginVertical: 5,
    },
    sessionBoxShadow:{
        width: '100%',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    sessionDate:{
        width: 70,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 70,
    },
    sessionDay:{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1e1e1e',
    },
    sessionMonth:{
        backgroundColor: '#E5E4E2',
        color: '#708090',
        padding: 4,
        borderRadius: 20,
        fontSize: 12,
        fontWeight: '900',
    },
    verticalBar:{
        height: 65,
        width: 2, 
        backgroundColor: 'lightgray',
        borderRadius: 20,
        marginLeft: 5,
    },
    sessionTitleTime:{
        marginLeft: 10,
        height: 50,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    sessionTitle:{
        color: '#71797E',
        fontSize: 16,
        fontWeight: '900',
    },
    sessionHour:{
        fontWeight: '600',
        color: '#1e1e1e',
    },
})