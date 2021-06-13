/*Aqui se ven la info de un libro seleccionado, da opcion para meter al carrito (cuantos ejemplares) o a la lista de deseos */
import React, {useState, useEffect} from "react";
import { Text, Dimensions, Alert, Image, StyleSheet } from "react-native";
import {
	Container, Header, Content, Form, Item, Input,
	Label,
	Button,
	H1,
	Left,
	Body
} from "native-base";
import * as SecureStore from "expo-secure-store";
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import IP_DB from '../../ip_address';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function LibroDetailsScreen({id, navigation}) {
	const [libro, setLibro] = useState(null);
	return(
		<Container>
			<Header
				transparent
				androidStatusBarColor="#C0FFC0"
				style={styles.Header}
			>
				<Left>
					<Button
						transparent
						style={styles.Button}
						onPress={() => {
							navigation.goBack();
						}}
					>
						<Icon size={30} name="chevron-left" />
					</Button>
				</Left>
				<Body>
					
				</Body>
			</Header>
		</Container>
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
		fontFamily: "Dosis",
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
	Text2: {
		marginTop: 5,
		fontWeight: "400",
		alignSelf: 'center',
		marginLeft: 5,
		fontFamily: "Dosis",
	},
	Header: {
		color: "#0D7C0D",
		fontFamily: "Dosis",
		fontSize: 20,
		fontWeight: "600"
	},
});