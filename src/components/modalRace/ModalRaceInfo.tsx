import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { currentYearTracks } from '../../../constants/currentYearTracks';

const ModalRaceInfo = ({trackId}) => {
	const [isLoading, setIsLoading] = useState(true);
    const [track, setTrack] = useState([]);

    const getData = async () => {
        const url = 'http://ergast.com/api/f1/circuits/' + trackId + '.json';

        try{
            const response = await fetch(url);
            const json = await response.json();
            setTrack(json.MRData.CircuitTable.Circuits[0]);
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
					<View style={styles.container}>
						<Text style={styles.infoTitleText}>INFO</Text>
						<View style={styles.boxContainer}>
							<View style={styles.boxInfo}>
								<Text style={styles.boxInfoTitleText}>Country</Text>
								<Text style={styles.boxInfoData}>{track?.Location?.country}</Text>
							</View>
							<View style={styles.boxInfo}>
								<Text style={styles.boxInfoTitleText}>Locality</Text>
								<Text style={styles.boxInfoData}>{track?.Location?.locality}</Text>
							</View>
						</View>
						<Text style={[styles.infoTitleText, {marginTop: 10}]}>CIRCUIT</Text>
						<Image source={currentYearTracks[track?.circuitId]} style={styles.trackImage} />
					</View>
				)
			}
		</View>
	)
}

export default ModalRaceInfo;

const styles = StyleSheet.create({
	container:{
		backgroundColor: '#ffffff',
		padding: 10,
	},
	infoTitleText:{
		fontWeight: '900',
        letterSpacing: 0.2,
        fontSize: 16,
        fontStyle: 'italic',
        alignSelf: 'flex-start',
        marginLeft: '2.5%',
        color: '#1e1e1e'
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
		width: '45%',
		height: 100,
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
	trackImage:{
		resizeMode: 'contain',
		height: 200,
		width: '100%',
		padding: 0,
	},
})