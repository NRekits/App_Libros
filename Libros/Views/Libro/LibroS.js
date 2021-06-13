/*Aqui se ven la info de un libro seleccionado, da opcion para meter al carrito (cuantos ejemplares) o a la lista de deseos */
import React, { useState, useEffect } from "react";
import { Text, Dimensions, Alert, Image, StyleSheet } from "react-native";
import {
	Container, Header, Content, Form, Item, Input,
	Label,
	Button,
	H1,
	Left,
	Body,
	Right,
	Title,
	Textarea,
	Radio
} from "native-base";
import * as SecureStore from "expo-secure-store";
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import IP_DB from '../../ip_address';
import { isLoading } from "expo-font";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class LibroDetailsScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			libro: {
				id: '',
				titulo: '',
				autor: '',
				sinopsis: '',
				genero: '',
				idEditorial: '',
				editorial: '',
				precio: '',
				cantidad: '',
				imagen: '',
				vendidos: '',
				fecha: new Date(),
				formato: ''
			},
			selectedFormat: ''
		}
	}

	async fetchLibro() {
		const { libro } = Object.assign({}, this.state);
		await fetch(`http://${IP_DB}:3000/Libro/Ver/${libro.id}`)
			.then(res => res.json())
			.then(res => res.data)
			.then((res) => {
				const newLibro = {
					id: res._id,
					titulo: res.Titulo,
					autor: res.Autor,
					sinopsis: res.Sinopsis,
					genero: res.Genero,
					idEditorial: res.Id_editorial,
					editorial: res.NombreEditorial,
					precio: res.Precio,
					cantidad: res.Cantidad_dis,
					imagen: res.Imagen,
					vendidos: res.Vendidos,
					fecha: new Date(res.Fecha_adquision),
					formato: res.Formato
				}
				this.setState({ libro: newLibro });
			})
	}

	async componentDidMount() {
		let { libro } = Object.assign({}, this.state);
		libro.id = this.props.route.params.id;
		await this.setState({ libro });
		await this.fetchLibro();
	}

	render() {
		const { libro } = this.state;
		return (
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
								this.props.navigation.goBack();
							}}
						>
							<Icon size={30} name="chevron-left" />
						</Button>
					</Left>
					<Body>
						<Title style={styles.Header}>{libro.titulo}</Title>
					</Body>
					<Right />
				</Header>
				<Content style={{ paddingLeft: 20, paddingRight: 20, marginBottom: 30  }}>
					<Image style={{ alignSelf: 'center', width: 200, height: 200 }} source={{ uri: `http://${IP_DB}:3000/Libro/Imagen/${libro.imagen}` }} />

					<Item style={styles.Item} floatingLabel disabled>
						<Label style={styles.Label}>Titulo</Label>
						<Input disabled style={styles.Input} value={libro.titulo} />
					</Item>

					<Item style={styles.Item} floatingLabel disabled>
						<Label style={styles.Label}>Autor</Label>
						<Input disabled style={styles.Input} value={libro.autor} />
					</Item>

					<Item style={styles.Item} disabled>
						<Textarea disabled style={styles.Input} rowSpan={5} value={libro.sinopsis} />
					</Item>

					<Item style={styles.Item} floatingLabel disabled>
						<Label style={styles.Label}>Genero</Label>
						<Input disabled style={styles.Input} value={libro.genero} />
					</Item>

					<Item style={styles.Item} floatingLabel disabled>
						<Label style={styles.Label}>Editorial</Label>
						<Input disabled style={styles.Input} value={libro.editorial} />
					</Item>

					<Item style={styles.Item} floatingLabel disabled>
						<Label style={styles.Label}>Precio</Label>
						<Input disabled style={styles.Input} value={`$${libro.precio}`} />
					</Item>

					<Item style={styles.Item} floatingLabel disabled>
						<Label style={styles.Label}>Disponibles</Label>
						<Input disabled style={styles.Input} value={`${libro.cantidad}`} />
					</Item>

					<Item style={styles.Item} floatingLabel disabled>
						<Label style={styles.Label}>Disponible desde:</Label>
						<Input disabled style={styles.Input} value={libro.fecha.toDateString()} />
					</Item>
					{
						libro.formato === 'Ambos' && (

							<Content>
								<Item
									onPress={() => { this.setState({ selectedFormat: "Físico" }) }}
								>
									<Text>Físico</Text>
									<Right>
										<Radio selected={this.state.selectedFormat === "Físico"}
										/>
									</Right>
								</Item>

								<Item
									onPress={() => { this.setState({ selectedFormat: "EPub" }) }}
								>
									<Text>EPub</Text>
									<Right>
										<Radio selected={this.state.selectedFormat === "EPub"}
										/>
									</Right>
								</Item>
							</Content>
						)
					}
					{
						libro.formato === "Físico" && (
							<Content>
								<Item
									onPress={() => { this.setState({ selectedFormat: "Físico" }) }}
								>
									<Text>Físico</Text>
									<Right>
										<Radio selected={this.state.selectedFormat === 'Físico'}
										/>
									</Right>
								</Item>
							</Content>
						)
					}
					{
						libro.formato === 'EPub' && (
							<Content>
								<Item
									onPress={() => { this.setState({ selectedFormat: "EPub" }) }}
								>
									<Text>EPub</Text>
									<Right>
										<Radio selected={this.state.selectedFormat === 'EPub'}
										/>
									</Right>
								</Item>
							</Content>
						)
					}

					<Button rounded success block style={styles.Button} onPress={() => {

					}}>
						<Text>Añadir al carro</Text>
					</Button>

				</Content>
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
		fontFamily: "Dosis",
		marginBottom: 10,
		color: "#0D7C0D",
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