import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { flagsNationality } from '../../../../constants/flagsNationality';
import { constructorsImages } from '../../../../constants/constructorImage';

const ConstructorsChampions1958_1987 = () => {
  	const [isLoading, setIsLoading] = useState(true);
	const [constructorsChampions, setConstructorsChampions] = useState([]);

	const getData = async () => {
		const url = 'http://ergast.com/api/f1/constructorStandings/1.json?limit=30';

		try{
			const response = await fetch(url);
			const json = await response.json();
			setConstructorsChampions(json.MRData.StandingsTable.StandingsLists);
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
					<View>
						{
							constructorsChampions.reverse().map((item, index) =>{
								return (
									<View key={index} style={styles.oneBox}>
										<Text style={styles.season}>{item?.season}</Text>
                                        <View style={styles.verticalBar}></View>
                                        <Image source={flagsNationality[item?.ConstructorStandings[0]?.Constructor?.nationality]} style={styles.flag} />
                                        <View style={styles.nameWinImage}>
                                            <View style={styles.nameWin}>
                                                <Text style={styles.name}>{item?.ConstructorStandings[0]?.Constructor?.name}</Text>
                                                <Text style={styles.winText}><Text style={styles.winNumber}>{item?.ConstructorStandings[0]?.wins}</Text> wins</Text>
                                            </View>
                                            <Image source={constructorsImages[item?.ConstructorStandings[0]?.Constructor?.constructorId]} style={styles.teamImage} />
                                        </View>
									</View>
								);
							})
						}
					</View>
				)
			}
		</View>
	  )
}

export default ConstructorsChampions1958_1987

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
    name:{
        color: '#1e1e1e',
        fontSize: 18,
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
    teamImage:{
        height: 50,
        width: 50,
        resizeMode: 'contain',
    }
})