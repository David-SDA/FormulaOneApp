import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

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
						<View>
							<View>
								<Text>Country</Text>
								<Text>{track?.Location?.country}</Text>
							</View>
							<View>
								<Text>Locality</Text>
								<Text>{track?.Location?.locality}</Text>
							</View>
						</View>
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
	}
})