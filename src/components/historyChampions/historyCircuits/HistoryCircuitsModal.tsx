import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { flags } from "../../../../constants/flags";
import { allTracks } from "../../../../constants/allTracks";

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
        <ScrollView style={styles.container}>
            {
                isLoading? (
                    <View style={{flex: 1, flexDirection:'column', justifyContent: 'center'}}>
                        <ActivityIndicator size={'large'} color={'#ff1801'} />
                    </View>
                ):(
                    <View>
                        {
                            circuit.map((item, index) => {
                                return(
                                    <View key={index} style={styles.all}>
                                        <View style={styles.flagTitleContainer}>
                                            <Image source={flags[item?.Location?.country]} style={styles.flag} />
                                            <Text style={styles.circuitName}>{item?.circuitName}</Text>
                                        </View>
                                        <View style={styles.circuitContainer}>
                                            <Text style={styles.circuitMapText}>CIRCUIT MAP</Text>
                                            <Image source={allTracks[item?.circuitId]} style={styles.circuitMap} />
                                        </View>
                                        <View style={[styles.boxInfo, {width: '97%', height: 120, alignSelf: 'center'}]}>
                                            <Text style={styles.boxInfoTitleText}>Circuit name</Text>
                                            <Text style={styles.boxInfoData}>{item?.circuitName}</Text>
                                            <Text />
                                        </View>
                                        <View style={styles.boxContainer}>
                                            <View style={styles.boxInfo}>
                                                <Text style={styles.boxInfoTitleText}>Country</Text>
                                                <Text style={styles.boxInfoData}>{item?.Location?.country === 'United States' ? 'USA' : item?.Location?.country}</Text>
                                                <Text />
                                            </View>
                                            <View style={styles.boxInfo}>
                                                <Text style={styles.boxInfoTitleText}>Locality</Text>
                                                <Text style={styles.boxInfoData}>{item?.Location?.locality}</Text>
                                                <Text />
                                            </View>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </View>
                )
            }
        </ScrollView>
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
    },
    flagTitleContainer:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
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
    circuitContainer:{
        width: '100%',
    },
    circuitMapText:{
        fontWeight: '900',
        letterSpacing: 0.2,
        fontSize: 16,
        fontStyle: 'italic',
        alignSelf: 'flex-start',
        marginLeft: '2.5%',
        marginVertical: 5,
        color: '#1e1e1e',
    },
    circuitMap:{
        padding: 0,
        width: '100%',
        height: 210,
        resizeMode: 'contain',
    },
    boxContainer:{
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginVertical: 10,
	},
	boxInfo:{
		borderColor: '#ff1801',
		borderRightWidth: 10,
		borderBottomWidth: 10,
		borderRadius: 10,
		borderBottomEndRadius: 30,
		width: '47%',
		height: 100,
		justifyContent: 'space-between',
	},
	boxInfoTitleText:{
		fontStyle: 'italic',
		fontWeight: 'bold',
		fontSize: 16,
		letterSpacing: 0.5,
		marginBottom: 10,
		color: '#71797E',
	},
	boxInfoData:{
		fontWeight: '900',
		fontSize: 24,
		textAlign: 'center',
		color: '#1e1e1e',
	},
})