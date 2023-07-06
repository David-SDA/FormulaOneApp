import React, { useEffect, useState } from 'react';
import { Image, View, Text, StyleSheet, ActivityIndicator, ScrollView, Pressable } from 'react-native';
import { currentConstructorColor } from '../../../constants/currentConstructorColor';

const ModalSessionResult = ({round, session}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [results, setResults] = useState([]);

    const getData = async () => {
        const url = 'http://ergast.com/api/f1/current/' + round + '/' + session + '.json';

        try{
            const response = await fetch(url);
            const json = await response.json();
            if(session === 'results'){
                setResults(json.MRData.RaceTable.Races[0].Results);
            }
            else if(session === 'sprint'){
                setResults(json.MRData.RaceTable.Races[0].SprintResults);
            }
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
        <ScrollView showsVerticalScrollIndicator={false}>
            <View>
                {
                    isLoading ? (
                        <View style={{flex: 1, flexDirection:'column', justifyContent: 'center'}}>
                            <ActivityIndicator size={'large'} color={'#ff1801'} />
                        </View>
                    ):(
                        <View style={{backgroundColor: '#ffffff'}}>
                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>
                                    {(session === 'results') ? 'RACE RESULTS' : 
                                    (session === 'qualifying') ? 'QUALIFYING RESULTS' :
                                    (session === 'sprint') ? 'SPRINT RESULTS' : ''}
                                </Text>
                            </View>
                            <View style={styles.lineInfoBar}>
                                <Text style={[styles.lineInfoText, {width: '10%', textAlign: 'center'}]}>POS</Text>
                                <Text style={[styles.lineInfoText, {width: '15%', textAlign: 'center'}]}>DRIVER</Text>
                                <Text style={[styles.lineInfoText, {width: '28%', textAlign: 'center'}]}>TIME/RETIRED</Text>
                                <Text style={[styles.lineInfoText, {width: '26%', textAlign: 'center'}]}>FASTEST LAP</Text>
                                <Text style={[styles.lineInfoText, {width: '8%', textAlign: 'center'}]}>PTS</Text>
                            </View>
                            {
                                results.map((item, index) => {
                                    return (
                                        <View key={index} style={styles.container}>
                                            <Text style={styles.position}>{item?.positionText}</Text>
                                            <View style={styles.barCode}>
                                                <View style={[styles.teamColorBar, {backgroundColor: currentConstructorColor[item?.Constructor?.constructorId]}]}></View>
                                                <Text style={styles.code}>  {item?.Driver?.code}</Text>
                                            </View>
                                            <Text style={styles.time}>{(item?.Time?.time) ? item?.Time.time : item?.status}</Text>
                                            <Text style={item?.FastestLap?.rank === "1" ? styles.fastestLap1 : styles.fastestLap}>{item?.FastestLap?.Time?.time}</Text>
                                            <Text style={styles.points}>{item?.points}</Text>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    )
                }
            </View>
        </ScrollView>
    )
}

export default ModalSessionResult;

const styles = StyleSheet.create({
    titleContainer:{        
        width: '100%',
        padding: 15,
        backgroundColor: '#ff1801',
    },
    title:{
        fontWeight: '900',
        fontSize: 20,
        color: '#ffffff',
    },
    lineInfoBar:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'dimgray',
        padding: 5
    },
    lineInfoText:{
        color: '#ffffff',
        fontSize: 12,
        fontWeight: '900',
        letterSpacing: 0.5,
    },
    container:{
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5,
        height: 50,
        borderColor: 'lightgray',
        borderWidth: 0.5,
    },
    position:{
        textAlign: 'center',
        width: '10%',
        fontWeight: '900',
    },
    barCode:{
        flexDirection: 'row',
        width: '15%',
    },
    teamColorBar:{
        width: 5,
        height: 22,
        borderRadius: 10,
    },
    code:{
        fontWeight: '900',
        fontSize: 16,
        textAlignVertical: 'center',
    },
    time:{
        width: '28%',
        textAlign: 'center',
        backgroundColor: '#e8e8e8',
        borderRadius: 20,
        fontWeight: '600',
    },
    fastestLap:{
        width: '26%',
        textAlign: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 20,
        fontWeight: '500'
    },
    fastestLap1:{
        width: '26%',
        textAlign: 'center',
        backgroundColor: '#BF40BF',
        color: '#ffffff',
        borderRadius: 20,
        fontWeight: '500'
    },
    points:{
        width: '8%',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '700'
    }
})