import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { flags } from "../../../../constants/flags";

const HistoryCircuitsModal = ({circuitId}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [circuit, setCircuit] = useState([]);

    const getData = async () => {
        const url = 'http://ergast.com/api/f1/circuits/' + circuitId + '.json';

        try{
            const response = await fetch(url);
            const json = await response.json();
            setCircuit(json.MRData.CircuitTable.Circuits);
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
        <View style={styles.container}>
            {
                isLoading? (
                    <View style={{flex: 1, flexDirection:'column', justifyContent: 'center'}}>
                        <ActivityIndicator size={'large'} color={'#ff1801'} />
                    </View>
                ):(
                    <ScrollView contentContainerStyle={{paddingHorizontal: 10}}>
                        {
                            circuit.map((item, index) => {
                                return(
                                    <View key={index} style={styles.all}>
                                        <View style={styles.flagTitleContainer}>
                                            <Image source={flags[circuit?.Location?.country]} style={styles.flag} />
                                            <Text style={styles.circuitName}>{item?.circuitName}</Text>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                )
            }
        </View>
    )
}

export default HistoryCircuitsModal;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#ffffff',
    },
    all:{
        backgroundColor: '#ffffff',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    flagTitleContainer:{
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
    circuitName:{
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: '900',
        fontSize: 20,
        width: '80%',
        color: '#ffffff',
    },
})