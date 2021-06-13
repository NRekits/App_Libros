/*Aqui debe mostrar resultados de una busqueda, se debe permitir hacer un filtro por rango de precios  y genero*/
import React from "react";
import { Text, Dimensions, Alert, Image, StyleSheet, ScrollView } from "react-native";
import {
	Container, Header, Item, Input,
	Button,
	Left,
	Body,
	Content,
	List
} from "native-base";
import * as SecureStore from "expo-secure-store";
import { LinearGradient } from 'expo-linear-gradient';
import IP_DB from '../../ip_address';
import Icon from 'react-native-vector-icons/FontAwesome'
import LibroItem from "./LibroItem";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class BusquedaScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			name: ""
		}
		this.goToLibro = this.goToLibro.bind(this);
	}

	goToLibro(id) {
		this.props.navigation.navigate('LibroS', {id: id});
	}

	async loadLibros(name) {
		await fetch(`http://${IP_DB}:3000/Libro/Buscar?name=${name}`)
			.then((res) => res.json())
			.then((res) => res.lib)
			.then(async (data) => {
				await this.setState({ data: [...data] });
			})
			.catch((error) => console.error(error));
	}

	async componentDidMount() {
		await this.loadLibros("");
	}

	render() {
		return (
			<Container>
				<Header
					androidStatusBarColor="#C0FFC0"
					transparent
					style={styles.Header}
					noLeft
				>
					<Left>
						<Button
							transparent
							style={styles.Button}
						>
							<Icon size={30} name="chevron-left" />
						</Button>
					</Left>
					<Body>
						<Item rounded>
							<Icon style={{paddingLeft: 10}} size={20} name="search" />
							<Input
								placeholder="Buscar"
								value={this.state.name}
								onChangeText={async (text) => {
									await this.setState({name: text});
									await this.loadLibros(this.state.name);
								}}	
								/>
						</Item>
					</Body>
				</Header>
					<List
						dataArray={this.state.data}
						keyExtractor={item => item._id}
						renderRow={(item) => {
							return(
								<LibroItem
									id={item._id}
									image={item.Imagen}
									titulo={item.Titulo}
									autor={item.Autor}
									precio={item.Precio}
									navigate={this.goToLibro}
								/>
							);
						}}
					></List>
			</Container>
		);
	}


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
		fontWeight: "600",
		marginTop: 30,
		borderBottomWidth: 1,
	},
});