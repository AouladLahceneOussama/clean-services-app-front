import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Titre, Button } from '../components'
import { icons, images, FONTS, COLORS, SIZES } from '../constants';
import List from './list'
import axios from 'axios';
import { useAuth } from '../context/authContext';

const Profile = ({ navigation }) => {

	const [employee, setEmployee] = useState({});
	const auth = useAuth();

	useEffect(() => {
		axios.get(`http://192.168.1.104:8080/api/employees/${auth.phone}`).then((res) => {
			if(Object.keys(res.data).length > 0)
				setEmployee(res.data);
		}).catch(err => {
			console.log("err profile => " + err);
		})
	}, []);

	return (

		<ScrollView>

			<View style={{
				position: "absolute",
				width: "100%",
				top: 10,
				left: 0,
				display: "flex",
				flexDirection: "row",
				justifyContent: "flex-end",
				zIndex: 10,
			}}>
				<TouchableOpacity
					style={{
						backgroundColor: COLORS.skyBlue,
						borderRadius: 50,
						padding: SIZES.padding / 3,
						marginRight: SIZES.margin
					}}
					onPress={() => { navigation.push("Settings") }}
				>
					<Image
						source={icons.settings}
						resizeMode="contain"
						style={{
							width: 25,
							height: 25,
							tintColor: COLORS.white,
						}}
					/>
				</TouchableOpacity>
			</View>

			<View style={styles.container}>

				<View style={styles.header2}>

					<View style={styles.containerLogoList}>
						<Image style={{ width: 70, height: 70, borderRadius: 600, marginLeft: 55 }}
							resizeMode="cover"
							source={{ uri: `http://192.168.1.104:8080/uploads/${employee.image}` }}
						/>
					</View>

					<View style={styles.h}>
						<View style={styles.button} >
							<Button text="my Articles" bgColor="#2196F3" onPress={() => { navigation.navigate("ListArticles") }}></Button>
							<TouchableOpacity onPress={() => navigation.push("AddService", { employee })}>
								<Image source={icons.plus} style={{ width: 30, height: 30, marginLeft: 5, tintColor: "#2196F3" }} />
							</TouchableOpacity>
						</View>

						<View style={{ marginLeft: 25 }}>
							<Titre>{employee.full_name}</Titre>

							<View >
								<Text style={{ color: COLORS.textGray }}>
									<Image style={{ width: 12, height: 12, tintColor: "#FFFFFF" }} resizeMode="contain" source={icons.phone}
									/> {employee.phone}
								</Text>
								<Text style={{ color: COLORS.textGray }}><Image style={{ width: 12, height: 12, tintColor: "#FFFFFF" }} resizeMode="contain" source={icons.email} />
									{employee.mail}
								</Text>
							</View>
						</View>
					</View>

					<View style={styles.Description}>
						<Titre>Description</Titre>
						<Text style={{ color: COLORS.textGray }}>
							{employee.description}
						</Text>
						<Titre>Planning</Titre>
					</View>

					<View>
						<List />
					</View>
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 80,
	},

	header1: {
		zIndex: 2,
		marginTop: 20,
	},

	header2: {
		flexDirection: "column",
		backgroundColor: COLORS.background,
		justifyContent: 'center',
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		position: "relative",
	},

	Description: {
		width: 350,
		marginTop: 0,
		marginLeft: 25,
		flexDirection: "column",
	},

	jour: {
		height: 20,
		marginLeft: -60,
	},

	containerMenu: {
		width: 50,
		height: 50,
		marginTop: 20,
		marginLeft: 20,
	},

	containerLogo: {
		width: 300,
		height: 50,
		backgroundColor: 'white',
		justifyContent: 'center',
	},

	containerLogoList: {
		top: -30,
		position: 'absolute',
	},

	button: {
		marginTop: 38,
		justifyContent: "flex-end",
		marginRight: SIZES.margin,
		flexDirection: 'row',
	},

	date: {
		width: 250,
		height: 35,
		justifyContent: 'space-around',
		alignItems: 'center',
		flexDirection: 'row',
		backgroundColor: "#FFF",
		borderRadius: 30,
		marginBottom: 10,
	},

	B: {
		width: 250,
		height: 35,
		marginLeft: 500,
		justifyContent: 'space-around',
		flexDirection: 'row',
		backgroundColor: "#FFF",
		borderRadius: 30,
		marginBottom: 10,
	},

});
export default Profile