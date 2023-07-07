import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { flags } from '../../../../constants/flags';
import Modal from 'react-native-modal';
import HistoryCircuitsModal from './HistoryCircuitsModal';

const HistoryCircuits = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [circuits, setCircuits] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCircuit, setSelectedCircuit] = useState(null);

    const openModal = (circuit: any) => {
        setSelectedCircuit(circuit);
        setModalVisible(true);
    }

    const closeModal = () => {
        setSelectedCircuit(null);
        setModalVisible(false);
    }

    const getData = async () => {
        const url = 'http://ergast.com/api/f1/circuits.json?limit=100';

        try{
            const response = await fetch(url);
            const json = await response.json();
            const jsonSorted = json.MRData.CircuitTable.Circuits.sort((a, b) => {
                if(a.circuitName.localeCompare(b.circuitName) === -1){
                    return -1;
                }
                else if(b.circuitName.localeCompare(a.circuitName) === -1){
                    return 1;
                }
            })
            setCircuits(jsonSorted); // Sorted by circuit name
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
                        <Modal
                            animationIn={'fadeIn'}
                            animationOut={'fadeOut'}
                            hideModalContentWhileAnimating
                            
                            onBackButtonPress={() => {
                                closeModal();
                            }}
                            isVisible={modalVisible}
                            style={styles.modal}
                        >
                            <HistoryCircuitsModal circuitId={selectedCircuit?.circuitId} />
                        </Modal>
                        {
                            circuits.map((item, index) => {
                                return (
                                    <Pressable key={index} style={styles.oneBox} onPress={() => {
                                        openModal(item);
                                    }}>
                                        <Image source={flags[item?.Location?.country]} style={styles.flag} />
                                        <Text style={styles.circuitName}>{item?.circuitName.toUpperCase()}</Text>
                                    </Pressable>
                                );
                            })
                        }
                    </ScrollView>
                )
            }
        </View>
    )
}

export default HistoryCircuits;

const styles = StyleSheet.create({
    modal:{
        margin: 0,
    },
    oneBox:{
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginVertical: 5,
        height: 70,
        borderRadius: 10,
    },
    flag:{
        height: 40,
        width: 50,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    circuitName:{
        width: '70%',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: '900',
        color: '#1e1e1e',
    },
})