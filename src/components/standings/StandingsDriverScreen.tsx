import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';

const StandingsDriverScreen = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [driverStandingsData, setDriverStandingsData] = useState([]);

    const getData = async () => {
        const url = 'https://ergast.com/api/f1/current/driverStandings.json';

        try{
            const response = await fetch(url);
            const json = await response.json();
            setDriverStandingsData(json.MRData.StandingsTable.StandingsLists[0].DriverStandings);
            // console.log(driverStandingsData);
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
                    <ScrollView contentContainerStyle={{paddingHorizontal: 10, paddingBottom: 200}}>
                        {
                            driverStandingsData.map((item, index) => {
                                let color: string;
                                switch (item?.Constructors[0]?.constructorId) {
                                    case 'red_bull':
                                        color = '#3671C6';
                                        break;
                                    case 'ferrari':
                                        color = '#F91536';
                                        break;
                                    case 'mercedes':
                                        color = '#6CD3BF';
                                        break;
                                    case 'aston_martin':
                                        color = '#358C75';
                                        break;
                                    case 'alpine':
                                        color = '#2293D1';
                                        break;
                                    case 'mclaren':
                                        color = '#F58020';
                                        break;
                                    case 'williams':
                                        color = '#37BEDD';
                                        break;
                                    case 'haas':
                                        color = '#B6BABD';
                                        break;
                                    case 'alfa':
                                        color = '#C92D4B';
                                        break;
                                    case 'alphatauri':
                                        color = '#5E8FAA';
                                        break;
                                    default:
                                        color = 'black'
                                        break;
                                }
                                return (
                                    <View style={styles.oneBox} key={index}>
                                        <View style={styles.positionTeamColorBar}>
                                            <View></View>
                                            <Text style={styles.position}>{item?.positionText}</Text>
                                            <View style={[styles.teamColorBar, {backgroundColor: color}]}></View>
                                        </View>
                                        <View style={styles.driverTeam}>
                                            <Text style={styles.driverName}><Text style={{fontWeight: 'normal'}}>{item?.Driver?.givenName}</Text> {item?.Driver?.familyName}</Text>
                                            <Text style={styles.team}>{item?.Constructors[0]?.name}</Text>
                                        </View>
                                        <Text style={styles.points}>{item?.points} <Text style={{fontSize: 12}}>pts</Text></Text>
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

export default StandingsDriverScreen;

const styles = StyleSheet.create({
    oneBox:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        width: '100%',
        height: '5%',
        marginTop: 5,
        marginBottom: 5,
    },
    positionTeamColorBar:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '15%',
    },
    position:{
        fontSize: 20,
        color: '#1e1e1e',
        fontWeight: '900',
    },
    teamColorBar:{
        width: 10,
        height: 60,
        borderRadius: 10,
    },
    driverTeam:{
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '55%',
        height: '90%',
    },
    driverName:{
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 0.4,
        color: '#1e1e1e',
    },
    team:{
        fontStyle: 'italic',
        color: 'gray',
    },
    points:{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1e1e1e',
        padding: 6,
        borderRadius: 20,
        backgroundColor: '#E5E4E2'
    },
})