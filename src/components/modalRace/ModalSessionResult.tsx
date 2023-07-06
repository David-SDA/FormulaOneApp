import React, { useEffect, useState } from 'react';
import { Image, View, Text, StyleSheet, ActivityIndicator, ScrollView, Pressable } from 'react-native';

const ModalSessionResult = ({round, session}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [results, setResults] = useState([]);

    const getData = async () => {
        const url = 'http://ergast.com/api/f1/current/' + round + '/' + session + '.json';

        try{
            const response = await fetch(url);
            const json = await response.json();
            setResults(json.MRData.RaceTable.Races[0].Results);
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
        <ScrollView>
            <View>
                {
                    isLoading ? (
                        <View style={{flex: 1, flexDirection:'column', justifyContent: 'center'}}>
                            <ActivityIndicator size={'large'} color={'#ff1801'} />
                        </View>
                    ):(
                        <View>
                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>
                                    {(session === 'results') ? 'RACE RESULTS' : 
                                    (session === 'qualifying') ? 'QUALIFYING RESULTS' :
                                    (session === 'sprint') ? 'SPRINT RESULTS' : ''}
                                </Text>
                            </View>
                            <View style={styles.lineInfoBar}>
                                <Text style={styles.lineInfoText}>POS</Text>
                                <Text style={styles.lineInfoText}>DRIVER</Text>
                                <Text style={styles.lineInfoText}>TIME/RETIRED</Text>
                                <Text style={styles.lineInfoText}>FASTEST LAP</Text>
                                <Text style={styles.lineInfoText}>PTS</Text>
                            </View>
                            {
                                results.map((item, index) => {
                                    return (
                                        <View key={index} style={styles.container}>
                                            <Text>{item?.positionText}</Text>
                                            <Text>{(item?.Time?.time) ? item?.Time.time : item?.status}</Text>
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
        padding: 10,
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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
    }
})