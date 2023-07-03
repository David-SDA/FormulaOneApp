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
                        <View>
                            <Text style={styles.titleHome}>Next Race Weekend</Text>
                        </View>
                        {
                            nextRace.map((item, index) => {
                                let dateDebut = new Date(item?.FirstPractice?.date);
                                let dateFin = new Date(item?.date);

                                if(dateFin >= new Date()){
                                    return (
                                        <View key={index} style={styles.container}>
                                            <View style={styles.roundContainer}>
                                                    <Image source={flags[item?.Circuit?.Location?.country]} style={styles.flag} />
                                                    <Text style={styles.raceName}>{item?.raceName.toUpperCase()}</Text>
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
        marginTop: 5,
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
    },
})