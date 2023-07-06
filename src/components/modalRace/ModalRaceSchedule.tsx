import React, { useEffect, useState } from 'react';
import { Image, View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { flags } from '../../../constants/flags';

const ModalRaceSchedule = ({round}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [race, setRace] = useState([]);

    const getData = async () => {
        const url = 'http://ergast.com/api/f1/current/' + round + '.json';

        try{
            const response = await fetch(url);
            const json = await response.json();
            setRace(json.MRData.RaceTable.Races);
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
        <View>
            {
                isLoading? (
                    <View style={{flex: 1, flexDirection:'column', justifyContent: 'center'}}>
                        <ActivityIndicator size={'large'} color={'#ff1801'} />
                    </View>
                ):(
                    <View>
                        {
                            race.map((item, index) => {
                                let dateFP1 = new Date(item?.FirstPractice?.date + 'T' + item?.FirstPractice?.time);
                                let dateFP2 = new Date(item?.SecondPractice?.date + 'T' + item?.SecondPractice?.time);
                                let dateQuali = new Date(item?.Qualifying.date + 'T' + item?.Qualifying.time);
                                let dateRace = new Date(item?.date + 'T' + item?.time);

                                if((item?.ThirdPractice)){
                                    let dateFP3 = new Date(item?.ThirdPractice?.date + 'T' + item?.ThirdPractice?.time);

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
                                                <Shadow distance={5} startColor='#00000010' style={styles.sessionBoxShadow}>
                                                    <View style={styles.sessionDate}>
                                                        <Text style={styles.sessionDay}>{dateQuali.toLocaleDateString('en-GB', {day: '2-digit'})}</Text>
                                                        <Text style={styles.sessionMonth}>{dateQuali.toLocaleDateString('en-GB', {month: 'short'})}</Text>
                                                    </View>
                                                    <View style={styles.verticalBar}></View>
                                                    <View style={styles.sessionTitleTime}>
                                                        <Text style={styles.sessionTitle}>QUALIFYING</Text>
                                                        <Text style={styles.sessionHour}>{dateQuali.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'})}</Text>
                                                    </View>
                                                </Shadow>
                                            </View>
                                            <View style={styles.sessionBox}>
                                                <Shadow distance={5} startColor='#00000010' style={styles.sessionBoxShadow}>
                                                    <View style={styles.sessionDate}>
                                                        <Text style={styles.sessionDay}>{dateFP3.toLocaleDateString('en-GB', {day: '2-digit'})}</Text>
                                                        <Text style={styles.sessionMonth}>{dateFP3.toLocaleDateString('en-GB', {month: 'short'})}</Text>
                                                    </View>
                                                    <View style={styles.verticalBar}></View>
                                                    <View style={styles.sessionTitleTime}>
                                                        <Text style={styles.sessionTitle}>FREE PRACTICE 3</Text>
                                                        <Text style={styles.sessionHour}>{dateFP3.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'})}</Text>
                                                    </View>
                                                </Shadow>
                                            </View>
                                            <View style={styles.sessionBox}>
                                                <Shadow distance={5} startColor='#00000010' style={styles.sessionBoxShadow}>
                                                    <View style={styles.sessionDate}>
                                                        <Text style={styles.sessionDay}>{dateFP2.toLocaleDateString('en-GB', {day: '2-digit'})}</Text>
                                                        <Text style={styles.sessionMonth}>{dateFP2.toLocaleDateString('en-GB', {month: 'short'})}</Text>
                                                    </View>
                                                    <View style={styles.verticalBar}></View>
                                                    <View style={styles.sessionTitleTime}>
                                                        <Text style={styles.sessionTitle}>FREE PRACTICE 2</Text>
                                                        <Text style={styles.sessionHour}>{dateFP2.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'})}</Text>
                                                    </View>
                                                </Shadow>
                                            </View>
                                            <View style={styles.sessionBox}>
                                                <Shadow distance={5} startColor='#00000010' style={styles.sessionBoxShadow}>
                                                    <View style={styles.sessionDate}>
                                                        <Text style={styles.sessionDay}>{dateFP1.toLocaleDateString('en-GB', {day: '2-digit'})}</Text>
                                                        <Text style={styles.sessionMonth}>{dateFP1.toLocaleDateString('en-GB', {month: 'short'})}</Text>
                                                    </View>
                                                    <View style={styles.verticalBar}></View>
                                                    <View style={styles.sessionTitleTime}>
                                                        <Text style={styles.sessionTitle}>FREE PRACTICE 1</Text>
                                                        <Text style={styles.sessionHour}>{dateFP1.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'})}</Text>
                                                    </View>
                                                </Shadow>
                                            </View>
                                        </View>
                                    );
                                }
                                else{
                                    let dateSprint = new Date(item?.Sprint.date + 'T' + item?.Sprint.time);

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
                                                <Shadow distance={5} startColor='#00000010' style={styles.sessionBoxShadow}>
                                                    <View style={styles.sessionDate}>
                                                        <Text style={styles.sessionDay}>{dateSprint.toLocaleDateString('en-GB', {day: '2-digit'})}</Text>
                                                        <Text style={styles.sessionMonth}>{dateSprint.toLocaleDateString('en-GB', {month: 'short'})}</Text>
                                                    </View>
                                                    <View style={styles.verticalBar}></View>
                                                    <View style={styles.sessionTitleTime}>
                                                        <Text style={styles.sessionTitle}>SPRINT</Text>
                                                        <Text style={styles.sessionHour}>{dateSprint.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'})}</Text>
                                                    </View>
                                                </Shadow>
                                            </View>
                                            <View style={styles.sessionBox}>
                                                <Shadow distance={5} startColor='#00000010' style={styles.sessionBoxShadow}>
                                                    <View style={styles.sessionDate}>
                                                        <Text style={styles.sessionDay}>{dateFP2.toLocaleDateString('en-GB', {day: '2-digit'})}</Text>
                                                        <Text style={styles.sessionMonth}>{dateFP2.toLocaleDateString('en-GB', {month: 'short'})}</Text>
                                                    </View>
                                                    <View style={styles.verticalBar}></View>
                                                    <View style={styles.sessionTitleTime}>
                                                        <Text style={styles.sessionTitle}>FREE PRACTICE 2</Text>
                                                        <Text style={styles.sessionHour}>{dateFP2.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'})}</Text>
                                                    </View>
                                                </Shadow>
                                            </View>
                                            <View style={styles.sessionBox}>
                                                <Shadow distance={5} startColor='#00000010' style={styles.sessionBoxShadow}>
                                                    <View style={styles.sessionDate}>
                                                        <Text style={styles.sessionDay}>{dateQuali.toLocaleDateString('en-GB', {day: '2-digit'})}</Text>
                                                        <Text style={styles.sessionMonth}>{dateQuali.toLocaleDateString('en-GB', {month: 'short'})}</Text>
                                                    </View>
                                                    <View style={styles.verticalBar}></View>
                                                    <View style={styles.sessionTitleTime}>
                                                        <Text style={styles.sessionTitle}>QUALIFYING</Text>
                                                        <Text style={styles.sessionHour}>{dateQuali.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'})}</Text>
                                                    </View>
                                                </Shadow>
                                            </View>
                                            <View style={styles.sessionBox}>
                                                <Shadow distance={5} startColor='#00000010' style={styles.sessionBoxShadow}>
                                                    <View style={styles.sessionDate}>
                                                        <Text style={styles.sessionDay}>{dateFP1.toLocaleDateString('en-GB', {day: '2-digit'})}</Text>
                                                        <Text style={styles.sessionMonth}>{dateFP1.toLocaleDateString('en-GB', {month: 'short'})}</Text>
                                                    </View>
                                                    <View style={styles.verticalBar}></View>
                                                    <View style={styles.sessionTitleTime}>
                                                        <Text style={styles.sessionTitle}>FREE PRACTICE 1</Text>
                                                        <Text style={styles.sessionHour}>{dateFP1.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'})}</Text>
                                                    </View>
                                                </Shadow>
                                            </View>
                                        </View>
                                    );
                                }
                            })
                        }
                    </View>
                )
            }
    </View>
            
    )
}

export default ModalRaceSchedule;

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
    },
    roundContainer:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        marginBottom: 5,
        padding: 5,
        backgroundColor: '#ff1801',
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
        color: '#ffffff',
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