import { Body, Left, ListItem, Right, Text, Thumbnail } from 'native-base';
import {StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import IP_DB from '../../ip_address';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function LibroItem({ id, image, titulo, autor, precio, navigation }) {
	return (
		<ListItem key={id} thumbnail button onPress={() => {
			navigation.navigate('LibroS', { id: id });
		}}>
			<Left>
				<Thumbnail square source={{ uri: `http://${IP_DB}:3000/Libro/Imagen/${image}` }} />
			</Left>
			<Body>
				<Text>{titulo}</Text>
				<Text note>{autor}</Text>
			</Body>
			<Right>
				<Text style={styles.PriceText}>${precio}</Text>
			</Right>
		</ListItem>
	);
}

const styles = StyleSheet.create({
	Container: {
		flex: 1,
		flexDirection: "column",
		alignItems: "stretch",
		justifyContent: "center",
		padding: 20,
		fontFamily: "Dosis",
	},
	Input: {
		alignSelf: "flex-start",
		fontFamily: "Dosis",
		fontWeight: "400",
		fontSize: 20,
		marginRight: 5,
	},
	Label: {
		fontWeight: "400",
		fontSize: 18,
		marginBottom: 10,
	},
	Button: {
		alignSelf: "center",
		marginTop: 40,
		borderColor: "#9BFFA3",
	},
	Item: {
		marginTop: 15,
		padding: 5,
	},
	background: {
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		height: windowHeight,
	},
	Header: {
		color: "#0D7C0D",
		fontFamily: "Dosis",
		fontSize: 20,
		fontWeight: "600"
	},
	PriceText: {
		color: "#0D7C0D",
		fontWeight: 'bold',
		fontSize: 24
	},
});