import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { driverImage } from '../../../../constants/driverImage';
import { flagsNationality } from '../../../../constants/flagsNationality';

const DriversChampions2020s = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [driversChampions, setDriversChampions] = useState([]);

    const getData = async () => {
        const url = 'http://ergast.com/api/f1/driverStandings/1.json?limit=10&offset=70';

        try{
            const response = await fetch(url);
            const json = await response.json();
            setDriversChampions(json.MRData.StandingsTable.StandingsLists);
        }catch(error){
            console.log(error);
            console.log(driversChampions);
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
                            driversChampions.reverse().map((item, index) => {
                                return (
                                    <View key={index} style={styles.oneBox}>
                                        <Text style={styles.season}>{item?.season}</Text>
                                        <View style={styles.verticalBar}></View>
                                        <Image source={flagsNationality[item?.DriverStandings[0]?.Driver?.nationality]} style={styles.flag} />
                                        <View style={styles.nameWinImage}>
                                            <View style={styles.nameWin}>
                                                <Text style={styles.firstName}>{item?.DriverStandings[0]?.Driver?.givenName} <Text style={styles.familyName}>{item?.DriverStandings[0]?.Driver?.familyName}</Text></Text>
                                                <Text style={styles.team}>{item?.DriverStandings[0]?.Constructors[0]?.name}</Text>
                                                <Text style={styles.winText}><Text style={styles.winNumber}>{item?.DriverStandings[0]?.wins}</Text> wins</Text>
                                            </View>
                                            <Image source={driverImage[item?.DriverStandings[0]?.Driver?.driverId]} style={styles.driverImage} />
                                        </View>
                                    </View>
                                );
                            })
                        }
                    </View>
                )
            }
        </View>
    );
}

export default DriversChampions2020s;

const styles = StyleSheet.create({
    oneBox:{
        backgroundColor: '#ffffff',
        marginVertical: 5,
        height: 70,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    season:{
        color: '#1e1e1e',
        fontWeight: '900',
        textAlign: 'center',
        fontSize: 20,
        marginHorizontal: 10,
    },
    verticalBar:{
        height: 65,
        width: 2, 
        backgroundColor: 'lightgray',
        borderRadius: 20,
        marginRight: 10,
    },
    flag:{
        height: 30,
        width: 40,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    nameWinImage:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '60%',
        marginLeft: 10,
    },
    nameWin:{
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        width: '73%',
        height: 65,
    },
    firstName:{
        color: '#1e1e1e',
        fontSize: 18,
    },
    familyName:{
        color: '#1e1e1e',
        fontWeight: 'bold',
    },
    team:{
        fontStyle: 'italic',
        fontSize: 12,
    },
    winNumber:{
        color: '#1e1e1e',
        fontWeight: 'bold',
        fontStyle: 'italic',
    },
    winText:{
        color: '#1e1e1e',
        fontStyle: 'italic',
    },
    driverImage:{
        height: 65,
        width: 65,
        resizeMode: 'cover',
        borderRadius: 65,
    }
})