import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';

const StandingsConstructorScreen = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [constructorStandingsData, setConstructorStandingsData] = useState([]);

    const getData = async () => {
        const url = 'http://ergast.com/api/f1/current/constructorStandings.json';

        try{
            const response = await fetch(url);
            const json = await response.json();
            setConstructorStandingsData(json.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
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
                    <ScrollView contentContainerStyle={{paddingHorizontal: 10, paddingBottom: 100}}>
                        {
                            constructorStandingsData.map((item, index) => {
                                let color: string;
                                let image: any;
                                switch (item?.Constructor?.constructorId) {
                                    case 'red_bull':
                                        color = '#3671C6';
                                        image = require('../../assets/teamsLogo/redbull.jpeg');;
                                        break;
                                    case 'ferrari':
                                        color = '#F91536';
                                        image = require('../../assets/teamsLogo/ferrari.jpeg');
                                        break;
                                    case 'mercedes':
                                        color = '#6CD3BF';
                                        image = require('../../assets/teamsLogo/mercedes.jpeg');
                                        break;
                                    case 'aston_martin':
                                        color = '#358C75';
                                        image = require('../../assets/teamsLogo/aston-martin.jpeg');
                                        break;
                                    case 'alpine':
                                        color = '#2293D1';
                                        image = require('../../assets/teamsLogo/alpine.jpg');
                                        break;
                                    case 'mclaren':
                                        color = '#F58020';
                                        image = require('../../assets/teamsLogo/mclaren.jpg');
                                        break;
                                    case 'williams':
                                        color = '#37BEDD';
                                        image = require('../../assets/teamsLogo/williams.jpg');
                                        break;
                                    case 'haas':
                                        color = '#B6BABD';
                                        image = require('../../assets/teamsLogo/haas.jpg');
                                        break;
                                    case 'alfa':
                                        color = '#C92D4B';
                                        image = require('../../assets/teamsLogo/alfa-romeo.jpg');
                                        break;
                                    case 'alphatauri':
                                        color = '#5E8FAA';
                                        image = require('../../assets/teamsLogo/alphatauri.jpg');
                                        break;
                                    default:
                                        color = 'black';
                                        image = require('../../assets/teamsLogo/redbull.jpeg');
                                        break;
                                }
                                return (
                                    <View style={[styles.oneBox, {height: '10%'}]} key={index}>
                                        <View style={styles.positionTeamColorBar}>
                                            <View></View>
                                            <Text style={styles.position}>{item?.positionText}</Text>
                                            <View style={[styles.teamColorBar, {backgroundColor: color}]}></View>
                                        </View>
                                        <Image source={image} style={{height: 50, width: 70,resizeMode: 'contain'}} />
                                        <Text style={styles.teamName}>{item?.Constructor?.name}</Text>
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

export default StandingsConstructorScreen;

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
        color: '#393646',
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
        color: '#393646'
    },
    team:{
        fontStyle: 'italic',
        color: 'gray',
    },
    points:{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#393646',
        padding: 6,
        borderRadius: 20,
        backgroundColor: '#E5E4E2'
    },
    teamName:{
        width: '40%',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
})